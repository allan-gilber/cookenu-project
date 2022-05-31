import FollowersTableData from '../../data/migrationData/tablesData/FollowersTableData';
import RecipesTableData from '../../data/migrationData/tablesData/RecipesTableData';
import UsersTableData from '../../data/migrationData/tablesData/UsersTableData';


export default class PopulationBusiness {
	public async populateUsersTable (){
		return await new UsersTableData().populateUsersTable();
	}
	public async populateRecipesTable (){
		return await new RecipesTableData().populateRecipesTable();
	}
	// public async populateFollowersTable (){
	// 	return await new FollowersTableData().populateFollowersTable();
	// }
}