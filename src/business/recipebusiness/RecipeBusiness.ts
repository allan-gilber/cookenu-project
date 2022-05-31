import { Request } from 'express';
import RecipeData from '../../data/RecipeData';
import UserData from '../../data/UserData';
import Authenticator from '../../services/Authenticator';
import IdGenerator from '../../services/IdGenerator';

export default class RecipeBusiness{

	async createNewRecipe(req: Request){
		const token = req.headers.authorization;
		const { recipeTitle, recipeDescription } = req.body;

		if(!token) throw new Error('invalidToken');

		const tokenData = new Authenticator().validateToken(token);

		if(!tokenData?.userId) throw new Error('invalidToken');
		if(!recipeTitle || !recipeDescription) throw 'invalidParamtersForRecipeCreation';

		const recipeId = new IdGenerator().generateId();
		const recipeCreationDate = new Date();

		return await new RecipeData().insertRecipeData(recipeId, recipeTitle, recipeDescription, recipeCreationDate, tokenData.userId);
	}
}