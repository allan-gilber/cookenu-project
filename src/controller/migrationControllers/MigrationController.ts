import PopulationBusiness from '../../business/migrationBusiness/PopulationBusiness';
import TableSchemaBusiness from '../../business/migrationBusiness/TableSchemaBusiness';
import DataBase from '../../services/DataBase';


export class MigrationController extends DataBase {
	public async startMigration(){
		try{
			console.clear();
			await new TableSchemaBusiness().createUserTableSchema()
				.then(() => new TableSchemaBusiness().createReciperTableSchema())
				.then(() => new TableSchemaBusiness().createFollowersTableSchema())
				.then(() => console.log('Table Schema successfully created!'));

			await new PopulationBusiness().populateUsersTable()
				.then(() => new PopulationBusiness().populateRecipesTable())
				.then(() => new PopulationBusiness().populateFollowersTable())
				.then(() => console.log('all tables has been successfully populated!'));
		} catch(error: any){
			console.log('error in MigrationController:', error.message);
		} finally{
			this.closeConnection();
		}
		return;
	}
}

new MigrationController().startMigration();
