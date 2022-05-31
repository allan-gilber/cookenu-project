import { Request, Response } from 'express';
import SignUpBusiness from '../../business/userBusiness/SignUpBusiness';
import ErrorMessages from '../MessageErrorsController';
import DataBase from '../../services/DataBase';


export default class SignUpController extends DataBase{

	async createNewUser (req: Request, resp: Response){
		try {
			await new SignUpBusiness().createUser(req);

			const succesfullResult = new ErrorMessages().getErrorMessage('signUpSuccesfull');

			resp.statusCode = succesfullResult.status;
			resp.send({message: succesfullResult.message});
		} catch(error: any){
			console.log('error in SignUpController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);

			resp.statusCode = errorMessage.status ?  errorMessage.status : 500;

			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}
}