import RecipeTableData from '../data/tables/RecipeTableData';
import UsersTableData from '../data/tables/UsersTableData';
import FollowersTableData from '../data/tables/FollowersTableData';


export default class TableSchemaBusiness {
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