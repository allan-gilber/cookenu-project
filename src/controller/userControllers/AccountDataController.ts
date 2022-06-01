import { Request, Response } from 'express';
import AccountDataBusiness from '../../business/userBusiness/AccountDataBusiness';
import ErrorMessages from '../errorsControllers/MessageErrorsController';
import DataBase from '../../services/DataBase';

export default class AccountDataController extends DataBase{
	async accountData (req: Request, resp: Response){
		try {
			const accountData = await new AccountDataBusiness().getAccountData(req);
			resp.statusCode = 201;
			resp.send({data: accountData});
		} catch(error: any){
			console.log('error in AccountDataController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);

			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}
	async accountDataFromOtherUser (req: Request, resp: Response){
		try {
			const accountData = await new AccountDataBusiness().getAccountDataFromOtherUser(req);
			resp.statusCode = 201;
			resp.send({data: accountData});
		} catch(error: any){
			console.log('error in AccountDataController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);

			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}
}