import DataBase from '../services/DataBase';

export default class FeedData extends DataBase {
	async requestUserFeed (userId: string) {
		return await this.connection().select(['followers.followed_id', 'recipes.recipe_id', 'recipes.recipe_title', 'recipes.recipe_description','recipes.recipe_creator_id', 'recipes.recipe_creation_date']).from('followers')
			.where('followers.follower_id', '=', userId)
			.innerJoin('recipes', 'recipes.recipe_creator_id', 'followers.followed_id').orderBy('recipes.recipe_creation_date', 'desc')
			.then((response): any => {
				console.log('resposta', response);
				if(!response) return []; 
				return response;
			});
	}
}