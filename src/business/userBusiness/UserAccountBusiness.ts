import { Request } from 'express';
import UserData from '../../data/UserData';
import Authenticator from '../../services/Authenticator';
import HashManager from '../../services/HashManager';
import IdGenerator from '../../services/IdGenerator';
import NodeMailer from '../../services/NodeMailer';

export default class AccountDataBusiness{

	async createUser(req: Request){
		const { userName, userEmail, userPassword, userRole, secretPassword } = req.body;

		if(!userName || !userEmail || !userPassword || !userRole) throw new Error('emptyParamtersForSignup');
		if(userPassword.length < 6) throw new Error('passwordMinimumLength');
		if(!['USER', 'ADMIN'].includes(userRole)) throw new Error('invalidRole');
		if(userRole === 'ADMIN' && secretPassword) new Authenticator().verifySecretPassword(secretPassword);

		await new UserData().checkUserEmailOnDatabase(userEmail);


		const userId = new IdGenerator().generateId();
		const passwordHash = await new HashManager().createHash(userPassword);

		await new UserData().insertUserData(userId, userName, userEmail, passwordHash, userRole);
	}

	async loginRequest(req: Request){
		const {userEmail, userPassword} = req.body;

		if(!userEmail || !userPassword) throw new Error('invalidParamtersForSignIn');
		if(userPassword.length < 6) throw new Error('invalidParamtersForSignIn');

		const userData = await new UserData().requestUserDataForLogin(userEmail);
		const passwordTest = await new HashManager().compareHashs(userPassword, userData.user_password);

		return Promise.all([userData, passwordTest]).then(([userDataResult, passwordTestresult])=>{
			if(!passwordTestresult) throw new Error('invalidParamtersForSignIn');

			return new Authenticator().generateNewToken({userId: userDataResult.userId, userRole: userDataResult.userRole, userEmail: userDataResult.user_email});});
	}

	async getAccountData (req: Request) {
		const token = req.headers.authorization;

		const tokenData = await new Authenticator().validateToken(token);

		return await new UserData().requestNonSensitiveData(tokenData.userId);
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

		const tokenData = await new Authenticator().validateToken(token);
		if(tokenData.userRole as unknown !== 'ADMIN') throw new Error('unauthorized');
		if(tokenData.userRole === userId) throw new Error('unableToSelfDestruct');
		const userData = new UserData();

		return await userData.checkUserIdOnDatabase(userId).then(() => userData.requestDeleteAccountData(userId));
	}

	async recoverPasswordLogic (req: Request) {
		('444');
		const {userEmail} = req.body;
		if(!userEmail) throw new Error('emptyParamterForPasswordRecovery');

		const accountData = await new UserData().checkUserEmailOnDatabase(userEmail);

		if(!accountData.user_name) return;
		
		const nameOfTheUser: string = accountData.user_name;

		return await new Authenticator().generateNewToken({userId: accountData.user_id, userRole: accountData.user_role, userEmail: accountData.user_email})
			.then((hash) => new NodeMailer(nameOfTheUser).sendEmail(userEmail, hash));
	}

	async setNewPasswordLogic (req: Request) {

		const {hashToken} = req.params;
		const {newPassword} = req.body;

		if(!hashToken) throw new Error('invalidToken');
		if(newPassword === undefined || newPassword?.length < 6) throw new Error('passwordMinimumLength');

		const token = await new Authenticator().validateToken(hashToken);
		const hashPassword = new HashManager().createHash(newPassword);

		return Promise.all([token, hashPassword]).then(([tokenData, hashData]) =>{
			return new UserData().requestPasswordEdit(hashData, tokenData.userEmail);}
		);
	}
}