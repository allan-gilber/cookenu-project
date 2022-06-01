import { Request } from 'express';
import RecipeData from '../../data/RecipeData';
import Authenticator from '../../services/Authenticator';
import IdGenerator from '../../services/IdGenerator';

export default class RecipeBusiness{

	async createNewRecipeLogic(req: Request){
		const token = req.headers.authorization;
		const { recipeTitle, recipeDescription } = req.body;

		const tokenData = new Authenticator().validateToken(token);

		if(!recipeTitle || !recipeDescription) throw new Error('invalidParamtersForRecipeCreation');

		const recipeId = new IdGenerator().generateId();
		const recipeCreationDate = new Date();

		return await new RecipeData().insertRecipeData(recipeId, recipeTitle, recipeDescription, recipeCreationDate, tokenData.userId);
	}

	async editRecipeLogic(req: Request){
		const token = req.headers.authorization;
		const { recipeId, recipeTitle, recipeDescription } = req.body;

		const tokenData = new Authenticator().validateToken(token);

		if(!recipeTitle && !recipeDescription || !recipeId) throw new Error('invalidParamtersForRecipeEdit');
		if((recipeTitle.length < 4 && !recipeTitle) || (recipeDescription < 4 && !recipeDescription)) throw new Error('postEditMinimumLength');

		const recipeRequest = new RecipeData();
		if(tokenData.userRole != 'ADMIN') await recipeRequest.checkRecipeOwnership(recipeId, tokenData.userId).then((result) => {
			if(!result[0]?.recipe_id) throw new Error('cantEditTheRecipe');});

		const recipeLastEditionDate = new Date();

		return await recipeRequest.editRecipeData(recipeId, recipeTitle, recipeDescription, recipeLastEditionDate);
	}

	async deleteRecipe(req: Request) {
		const token = req.headers.authorization;
		const { recipeId } = req.body;
		if(!recipeId) throw new Error('invalidRecipeId');

		const tokenData = new Authenticator().validateToken(token);
		const recipeRequest = new RecipeData();

		console.log(tokenData.userRole, tokenData.userRole != 'ADMIN');
		if(tokenData.userRole != 'ADMIN') await recipeRequest.checkRecipeOwnership(recipeId, tokenData.userId).then((result) => {
			if(!result[0]?.recipe_id) throw new Error('cantEditTheRecipe');
		});

		return await recipeRequest.deleteRecipeData(recipeId);
	}
}