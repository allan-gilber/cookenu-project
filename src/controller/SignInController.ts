import { Request, Response } from 'express';
import SignInBusiness from '../business/SignInBusiness';
import ErrorMessages from '../data/utilities/MessageErrors';
import DataBase from '../services/DataBase';


export default class SignInController extends DataBase{

	async loginToServer (req: Request, resp: Response){
		try {
			const tokenRequest = await new SignInBusiness().loginRequest(req);

			resp.statusCode = 201;
			resp.send({ token: tokenRequest});
		} catch(error: any){
			console.log('error in SignInController:', error?.message);

			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);

			resp.statusCode = errorMessage.status ?  errorMessage.status : 500;
			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}
}