import DataBase from '../services/DataBase';

export default class RecipeData extends DataBase {	
	async insertRecipeData(recipeId: string, recipeTitle: string, recipeDescription: string, recipeCreationDate: Date, recipeCreatorId: string): Promise<any>{
		return await this.connection().table('recipes').insert({
			recipe_id: recipeId,
			recipe_title:recipeTitle,
			recipe_description:recipeDescription,
			recipe_creation_date:recipeCreationDate,
			recipe_creator_id: recipeCreatorId,
		});
	}
}