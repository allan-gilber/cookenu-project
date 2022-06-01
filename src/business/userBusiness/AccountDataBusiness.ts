import { Request } from 'express';
import UserData from '../../data/UserData';
import Authenticator from '../../services/Authenticator';

export default class AccountDataBusiness{

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
}