import { recipeCreatorId, recipeId } from '../model/Recipes';
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

	async checkRecipeOwnership(recipeId: string, userRequestId: string): Promise<recipeId>{
		return await this.connection().table('recipes').select('recipe_id').where({'recipe_creator_id': userRequestId, 'recipe_id': recipeId}).then((result) => result[0]?.recipe_id );
	}

	async editRecipeData(recipeId: string, recipeTitle: string, recipeDescription: string, recipeLastEditDate: Date): Promise<any>{
		return await this.connection().transaction(async (transaction)=>{
			if(recipeDescription){
				await transaction.table('recipes').update({recipe_description: recipeDescription}).where({recipe_id: recipeId});
			}
			if(recipeTitle){
				await transaction.table('recipes').update({recipe_title: recipeTitle}).where({recipe_id: recipeId});
			}
			await transaction.table('recipes').update({recipe_last_edit_date: recipeLastEditDate}).where({recipe_id: recipeId});
		});
	}
}