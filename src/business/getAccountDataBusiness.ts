import { Request } from 'express';
import UserData from '../data/UserData';
import Authenticator from '../services/Authenticator';

export default class AccountDataBusiness{

	async getAccountData(req: Request){
		const token = req.headers.authorization;
		const {userId} = req.params;

		if(!userId) throw new Error('invalidUserId');
		if(!token) throw new Error('invalidUserId');

		const tokenData = new Authenticator().validateToken(token);

		console.log('tt1',tokenData);
		throw 'invalidUserId';
		await new UserData().getNonSensitiveData(userId);
	}
}