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
}