import { Request, Response } from 'express';
import { SignUpBusiness } from '../business/SignUpBusiness';
import { DataBase } from '../services/DataBase';


export class SignUpController extends DataBase{

	async createNewUser (req: Request, resp: Response){
		try {
			await new SignUpBusiness().createUser(req, resp);
		} catch(error: any){
			console.log('error in MigrationController:', error.message);
		} finally{
			this.closeConnection();
		}
	}
}