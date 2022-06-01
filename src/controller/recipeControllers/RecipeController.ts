import { Request, Response } from 'express';
import ErrorMessages from '../errorsControllers/MessageErrorsController';
import DataBase from '../../services/DataBase';
import RecipeBusiness from '../../business/recipebusiness/RecipeBusiness';

export default class RecipeController extends DataBase{
	async createRecipe (req: Request, resp: Response){
		try {
			await new RecipeBusiness().createNewRecipeLogic(req);
			resp.statusCode = 201;
			resp.send({ message: 'recipe successful created!'});
		} catch(error: any){
			console.log('error in RecipeController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);

			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}

	async editRecipe (req: Request, resp: Response){
		try {
			await new RecipeBusiness().editRecipeLogic(req);
			resp.statusCode = 201;
			resp.send({ message: 'recipe successful edited!'});
		} catch(error: any){
			console.log('error in RecipeController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);

			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}

	async deleteRecipe (req: Request, resp: Response) {
		try {
			await new RecipeBusiness().deleteRecipe(req);
			resp.statusCode = 201;
			resp.send({ message: 'recipe successfully deleted!'});
		} catch(error: any) {
			console.log('error in FollowersController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);
			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}
}