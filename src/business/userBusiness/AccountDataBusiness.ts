import { Request } from 'express';
import UserData from '../../data/UserData';
import Authenticator from '../../services/Authenticator';
import HashManager from '../../services/HashManager';
import IdGenerator from '../../services/IdGenerator';
import NodeMailer from '../../services/SendEmail';

export default class AccountDataBusiness{

	async createUser(req: Request){
		const { userName, userEmail, userPassword, userRole, secretPassword } = req.body;

		if(!userName || !userEmail || !userPassword || !userRole) throw new Error('emptyParamtersForSignup');
		if(userPassword.length < 6) throw new Error('passwordMinimumLength');
		if(!['USER', 'ADMIN'].includes(userRole)) throw new Error('invalidRole');
		if(userRole === 'ADMIN' && secretPassword) new Authenticator().verifySecretPassword(secretPassword);

		await new UserData().checkUserEmailOnDatabase(userEmail);


		const userId = new IdGenerator().generateId();
		const passwordHash = new HashManager().createHash(userPassword);

		await new UserData().insertUserData(userId, userName, userEmail, passwordHash, userRole);
	}

	async loginRequest(req: Request){
		const {userEmail, userPassword} = req.body;

		if(!userEmail || !userPassword) throw new Error('invalidParamtersForSignIn');
		if(userPassword.length < 6) throw new Error('invalidParamtersForSignIn');

		const userData = await new UserData().requestUserDataForLogin(userEmail);
		const passwordHash = new HashManager().compareHashs(userPassword, userData.user_password);  

		if(!passwordHash) throw new Error('invalidParamtersForSignIn');

		return new Authenticator().generateNewToken({userId: userData.user_id, userRole: userData.user_role});
	}

	async getAccountData (req: Request) {
		const token = req.headers.authorization;

		const tokenData = new Authenticator().validateToken(token);

		return await new UserData().requestNonSensitiveData(tokenData.userId as string);
	}

	async getAccountDataFromOtherUser (req: Request) {
		const token = req.headers.authorization;
		const {userId} = req.params;

		new Authenticator().validateToken(token);

		return await new UserData().requestNonSensitiveData(userId);
	}

	async deleteAccount (req: Request) {
		const token = req.headers.authorization;
		const {userId} = req.body;

		const tokenData = new Authenticator().validateToken(token);
		console.log(tokenData.userRole, tokenData.userRole != 'ADMIN', tokenData.userRole === userId);
		if(tokenData.userRole != 'ADMIN') throw new Error('unauthorized');
		if(tokenData.userRole === userId) throw new Error('unableToSelfDestruct');
		const userData = new UserData();

		return await userData.checkUserIdOnDatabase(userId).then(() => userData.requestDeleteAccountData(userId));
	}

	async recoverPasswordLogic (req: Request) {

		const {userEmail} = req.body;
		let nameOfTheUser: string;

		if(!userEmail) throw new Error('emptyParamterForPasswordRecovery');

		const userData = new UserData();

		return await userData.checkUserEmailOnDatabase(userEmail)
			.then((response) => {
				console.log('ttt',response);
				if(!response[0].user_name) return;
				nameOfTheUser = response[0]?.user_name;

				return new Authenticator().generateNewToken({userId: response[0].user_name, userRole: response[0].user_email})
					.then((hash) => new NodeMailer(nameOfTheUser).sendEmail(userEmail, hash));
			});
	}
}