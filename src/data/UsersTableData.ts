import { DataBase } from '../services/DataBase';

export class UsersTableData extends DataBase {
	public async createUserTable(){ 
		return await this.connection().schema.createTable('users', (table) =>{
			table.string('user_id').primary();
			table.string('user_name').notNullable();
			table.string('user_email').notNullable().unique();
			table.string('user_password').notNullable();
		}).then(()=> console.log('Table "users" successful created!'));
	}
}