import { Request, Response } from 'express';
import ErrorMessages from '../errorsControllers/MessageErrorsController';
import DataBase from '../../services/DataBase';
import FollowersBusiness from '../../business/followersBusiness/FollowersBusiness';

export default class FollowersController extends DataBase{
	async followUser (req: Request, resp: Response){
		try {
			const followedUserName = await new FollowersBusiness().followUser(req);
			resp.statusCode = 201;
			resp.send({ message: `the user ${followedUserName[0]?.user_name} is now being followed!`});
		} catch(error: any){
			console.log('error in FollowersController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);

			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}
	async unfollowUser (req: Request, resp: Response) {
		try{
			const unfollowedUser = await new FollowersBusiness().unfollowUser(req);
			resp.statusCode = 201;
			resp.send({ message: `the user ${unfollowedUser[0]?.user_name} has been unfollowed!`});
		} catch(error: any){
			console.log('error in FollowersController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);
			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}
}