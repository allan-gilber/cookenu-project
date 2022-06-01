import { Request, Response } from 'express';
import SignInBusiness from '../../business/userBusiness/SignInBusiness';
import ErrorMessages from '../errorsControllers/MessageErrorsController';
import DataBase from '../../services/DataBase';


export default class SignInController extends DataBase{

	async loginToServer (req: Request, resp: Response){
		try {
			const tokenRequest = await new SignInBusiness().loginRequest(req);

			resp.statusCode = 201;
			resp.send({ token: tokenRequest});
		} catch(error: any){
			console.log('error in SignInController:', error?.message);

			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);


			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}
}