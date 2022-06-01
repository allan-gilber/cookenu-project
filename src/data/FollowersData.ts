import { followerId } from '../model/Followers';
import DataBase from '../services/DataBase';

export default class FollowersData extends DataBase {
	async checkFollowerTableFortIds(followerId: string, followedId: string): Promise<followerId>{
		return await this.connection().table('followers').select('follower_id').where({
			follower_id: followerId,
			followed_id: followedId
		}).then((response) => {
			return response[0]?.follower_id;
		});
	}

	async insertNewFollowerData(followersTableId: string,  followerId: string, followedId: string ): Promise<any>{
		return await this.connection().table('followers').insert({
			follower_table_id: followersTableId,
			follower_id: followerId,
			followed_id: followedId
		}).then(async () => await this.connection().table('users').select('user_name').where('user_id', '=', followedId));
	}

	async deleteFollowingUserData(followerId: string, followedId: string): Promise<any>{
		return await this.connection().table('followers').where({followed_id: followedId, follower_id: followerId}).del().then(async () => await this.connection().table('users').select('user_name').where('user_id', '=', followedId));
	}
}