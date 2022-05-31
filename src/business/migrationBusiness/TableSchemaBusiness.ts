import RecipesTableData from '../../data/migrationData/tablesData/RecipesTableData';
import UsersTableData from '../../data/migrationData/tablesData/UsersTableData';
import FollowersTableData from '../../data/migrationData/tablesData/FollowersTableData';


export default class TableSchemaBusiness {
	public async createUserTableSchema (){
		return await new UsersTableData().createUserTable();
	}
	public async createReciperTableSchema (){
		await new RecipesTableData().createRecipeTable();
	}
	public async createFollowersTableSchema (){
		await new FollowersTableData().createFollowersTable();
	}
}