import { RecipeTableData } from '../data/RecipeTableData';
import { UsersTableData } from '../data/UsersTableData';
import { FollowersTableData } from '../data/FollowersTableData';


export class TableSchemaBusiness {
	public async createUserTableSchema (){
		return await new UsersTableData().createUserTable();
	}
	public async createReciperTableSchema (){
		await new RecipeTableData().createRecipeTable();
	}
	public async createFollowersTableSchema (){
		await new FollowersTableData().createFollowersTable();
	}
}