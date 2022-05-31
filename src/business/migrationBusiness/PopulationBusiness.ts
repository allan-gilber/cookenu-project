import UsersTableData from '../../data/migrationData/tablesData/UsersTableData';


export default class PopulationBusiness {
	public async populateUsersTable (){
		return await new UsersTableData().populateUsersTable();
	}
}