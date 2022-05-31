import RecipeTableData from '../../data/migrationData/tablesData/RecipeTableData';
import UsersTableData from '../../data/migrationData/tablesData/UsersTableData';
import FollowersTableData from '../../data/migrationData/tablesData/FollowersTableData';


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