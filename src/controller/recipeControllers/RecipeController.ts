import { Request, Response } from 'express';
import ErrorMessages from '../MessageErrorsController';
import DataBase from '../../services/DataBase';
import RecipeBusiness from '../../business/recipebusiness/RecipeBusiness';


export default class RecipeController extends DataBase{

	async createRecipe (req: Request, resp: Response){
		try {
			await new RecipeBusiness().createNewRecipe(req);

			resp.statusCode = 201;
			resp.send({ message: 'recipe succesfull created!'});
		} catch(error: any){
			console.log('error in RecipeController:', error?.message);

			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);

			resp.statusCode = errorMessage.status ?  errorMessage.status : 500;
			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}
}