import DataBase from '../services/DataBase';

export default class FollowersData extends DataBase {
	async checkIfUserIsAlreadyAFollower(followerId: string, followedId: string): Promise<any>{
		return await this.connection().table('followers').select('follower_id').where({
			follower_id: followerId,
			followed_id: followedId
		}).then((response) =>{
			if(response[0]) throw new Error('userIsAlreadyBeeingFollowed');
		});
	}

	async insertNewFollowerData(followersTableId: string,  followerId: string, followedId: string ): Promise<any>{
		return await this.connection().table('followers').insert({
			follower_table_id: followersTableId,
			follower_id: followerId,
			followed_id: followedId
		}).then(async () => await this.connection().table('users').select('user_name').where('user_id', '=', followedId));
	}
}