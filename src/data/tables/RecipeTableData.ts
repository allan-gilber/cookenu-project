import DataBase from '../../services/DataBase';

export default class RecipeTableData extends DataBase {
	public async createRecipeTable(){ 
		return await this.connection().schema.createTable('recipes', (table: any) =>{
			table.string('recipe_id').primary();
			table.string('recipe_title').notNullable();
			table.string('recipe_description').notNullable();
			table.date('recipe_creation_date').notNullable();
		}).then(()=> console.log('Table "recipes" successful created!'));
	}
}