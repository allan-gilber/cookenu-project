import { TableSchemaBusiness } from '../business/TableSchemaBusiness';
import { DataBase } from '../services/DataBase';


export class MigrationController extends DataBase {
	public async startMigration(){
		try{
			console.clear();
			await new TableSchemaBusiness().createUserTableSchema()
				.then(() => new TableSchemaBusiness().createReciperTableSchema())
				.then(() => new TableSchemaBusiness().createFollowersTableSchema())
				.then(() => console.log('Table Schema succesfully created!'));
		} catch(error: any){
			console.log('error in MigrationController:', error.message);
		} finally{
			console.log('close');
			this.closeConnection();
		}
	}
}

new MigrationController().startMigration();
