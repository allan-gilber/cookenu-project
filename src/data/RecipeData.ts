import DataBase from '../services/DataBase';

export default class RecipeData extends DataBase {	
	async insertRecipeData(recipeId: string, recipeTitle: string, recipeDescription: string, recipeCreationDate: Date): Promise<any>{
		return await this.connection().table('recipes').insert({
			recipe_id: recipeId,
			recipe_title:recipeTitle,
			recipe_description:recipeDescription,
			recipe_creation_date:recipeCreationDate,
		});
	}
}