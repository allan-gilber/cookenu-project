import { Request } from 'express';
import FollowersData from '../../data/FollowersData';
import UserData from '../../data/UserData';
import Authenticator from '../../services/Authenticator';
import IdGenerator from '../../services/IdGenerator';

export default class FollowersBusiness {

	async followUser(req: Request) {
		const token = req.headers.authorization;
		const { userToBeFollowedId } = req.body;

		if(!token) throw new Error('invalidToken');

		const tokenData = new Authenticator().validateToken(token);
		console.log(tokenData);
		if(!tokenData?.userId) throw new Error('invalidToken');
		if(tokenData?.userId === userToBeFollowedId) throw new Error('youCantFollowYourself');

		await new UserData().checkUserIdOnDatabase(userToBeFollowedId);
		await new FollowersData().checkIfUserIsAlreadyAFollower(tokenData.userId, userToBeFollowedId);

		const followerTableId = new IdGenerator().generateId();

		return await new FollowersData().insertNewFollowerData(followerTableId, tokenData.userId, userToBeFollowedId);
	}
}