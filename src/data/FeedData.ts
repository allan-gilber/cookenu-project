import DataBase from '../services/DataBase';

export default class FeedData extends DataBase {
	async requestUserFeed (userId: string) {
		return await this.connection()
			.select('users.user_name as creator_name', 'followers.followed_id as creator_id', 'recipes.recipe_id', 'recipes.recipe_title', 'recipes.recipe_description', 'recipes.recipe_creation_date')
			.from('followers')
			.where('followers.follower_id', '=', userId)
			// .orWhere('creator_name', '=', userId)
			.innerJoin('recipes', 'recipes.recipe_creator_id', 'followers.followed_id').orderBy('recipes.recipe_creation_date', 'desc')
			.innerJoin('users', 'users.user_id', 'followers.followed_id')
			.then((response): any => {
				if(!response) return []; 
				return response;
			});
	}
}