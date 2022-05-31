import DataBase from '../../../services/DataBase';
import recipesDummyData from '../dummyData/recipesDummyData.json';

export default class RecipesTableData extends DataBase {
	public async createRecipeTable(){ 
		return await this.connection().schema.createTable('recipes', (table: any) =>{
			table.string('recipe_id').primary();
			table.string('recipe_creator_id').notNullable();
			table.string('recipe_title').notNullable();
			table.string('recipe_description').notNullable();
			table.date('recipe_creation_date').notNullable();
			table.foreign('recipe_creator_id').references('user_id').inTable('users');
		}).then(()=> console.log('Table "recipes" successful created!'));
	}

	async populateRecipesTable(){
		return await this.connection().table('recipes').insert(recipesDummyData)
			.then(()=> console.log('Table "Recipes" successful populated!'));
	}
}