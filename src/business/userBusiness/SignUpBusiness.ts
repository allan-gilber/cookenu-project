import { Request } from 'express';
import UserData from '../../data/UserData';
import Authenticator from '../../services/Authenticator';
import HashManager from '../../services/HashManager';
import IdGenerator from '../../services/IdGenerator';

export default class SignUpBusiness{

	async createUser(req: Request){
		const { userName, userEmail, userPassword, userRole, secretPassword } = req.body;

		if(!userName || !userEmail || !userPassword || !userRole) throw new Error('emptyParamtersForSignup');
		if(userPassword.length < 6) throw new Error('passwordMinimumLength');
		if(!['USER', 'ADMIN'].includes(userRole)) throw new Error('invalidRole');
		if(userRole === 'ADMIN') new Authenticator().verifySecretPassword(secretPassword);

		await new UserData().checkUserEmailOnDatabase(userEmail);


		const userId = new IdGenerator().generateId();
		const passwordHash = new HashManager().createHash(userPassword);

		await new UserData().insertUserData(userId, userName, userEmail, passwordHash, userRole);
	}
}