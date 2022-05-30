import { Request } from 'express';
import UserData from '../data/UserData';
import Authenticator from '../services/Authenticator';
import HashManager from '../services/HashManager';

export default class SignInBusiness {

	async loginRequest(req: Request){
		const {userEmail, userPassword} = req.body;

		if(!userEmail || !userPassword) throw new Error('invalidParamtersForSignIn');
		if(userPassword.length < 6) throw new Error('invalidParamtersForSignIn');

		const userData = await new UserData().getUserDataForLogin(userEmail);
		const passwordHash = new HashManager().compareHashs(userPassword, userData.user_password);  

		if(!passwordHash) throw new Error('invalidParamtersForSignIn');

		return new Authenticator().generateNewToken({userId: userData.user_id, userRole: userData.user_role});
	}
}