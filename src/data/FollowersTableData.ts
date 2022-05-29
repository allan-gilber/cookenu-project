import { DataBase } from '../services/DataBase';

export class FollowersTableData extends DataBase {
	public async createFollowersTable(){ 
		return await this.connection().schema.createTable('followers', (table) =>{
			table.string('follower_table_id').primary();
			table.string('user_id').notNullable().unique();
			table.string('follower_id').notNullable();
			table.foreign('user_id').references('user_id').inTable('users');
			table.foreign('follower_id').references('user_id').inTable('users');
		}).then(()=> console.log('Table "followers" successful created!'));
	}
}