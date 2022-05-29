import { Request, Response } from 'express';
import { UserData } from '../data/UserData';
import { IdGenerator } from '../services/IdGenerator';

export class SignUpBusiness{

	async createUser(req: Request, resp: Response){
		const { userName, userEmail, userPassword } = req.body;

		if(!userName || !userEmail || !userPassword) throw 'emptyParamters';

		const userId = new IdGenerator().generateId();

		const inertIntoDatabase = await  new UserData().insertUserData(userId, userName, userEmail, userPassword);
		if(inertIntoDatabase){
			resp.status(201).send({status: 'Success!', userId: userId});
		}
	}
}