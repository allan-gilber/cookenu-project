import { Request, Response } from 'express';
import ErrorMessages from '../MessageErrorsController';
import DataBase from '../../services/DataBase';
import FollowersBusiness from '../../business/followersBusiness/FollowersBusiness';


export default class FollowersController extends DataBase{

	async createRecipe (req: Request, resp: Response){
		try {
			const followedUserName = await new FollowersBusiness().followUser(req);

			resp.statusCode = 201;
			console.log('retorno',followedUserName);
			resp.send({ message: `the user ${followedUserName[0]?.user_name} is now being followed!`});
		} catch(error: any){
			console.log('error in FollowersController:', error?.message);

			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);

			resp.statusCode = errorMessage.status ?  errorMessage.status : 500;
			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}
}