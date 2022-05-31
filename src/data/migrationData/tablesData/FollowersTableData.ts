import DataBase from '../../../services/DataBase';
import followersDummyData from '../dummyData/followersDummyData.json';

export default class FollowersTableData extends DataBase {
	async createFollowersTable(){ 
		return await this.connection().schema.createTable('followers', (table: any) =>{
			table.string('follower_table_id').primary();
			table.string('follower_id').notNullable();
			table.string('followed_id').notNullable();
			table.foreign('followed_id', 'followed_id').references('user_id').inTable('users');
		}).then(()=> console.log('Table "followers" successful created!'));
	}

	async populateFollowersTable(){
		return await this.connection().table('followers').insert(followersDummyData)
			.then(()=> console.log('Table "Followers" successful populated!'));
	}
}