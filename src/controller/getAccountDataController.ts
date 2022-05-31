import { Request, Response } from 'express';
import AccountDataBusiness from '../business/getAccountDataBusiness';
import ErrorMessages from '../data/utilities/MessageErrors';
import DataBase from '../services/DataBase';


export default class AccountDataController extends DataBase{

	async getAccountData (req: Request, resp: Response){
		try {
			const accountData = await new AccountDataBusiness().getAccountData(req);

			resp.statusCode = 201;
			resp.send({data: accountData});
		} catch(error: any){
			console.log('error in getAccountDataController:', error?.message);

			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);

			resp.statusCode = errorMessage.status ?  errorMessage.status : 500;
			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}
}