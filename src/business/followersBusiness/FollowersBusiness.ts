import { Request } from 'express';
import FollowersData from '../../data/FollowersData';
import UserData from '../../data/UserData';
import { userRole } from '../../model/User';
import Authenticator from '../../services/Authenticator';
import IdGenerator from '../../services/IdGenerator';

export default class FollowersBusiness {

	async followUser(req: Request) {
		const token = req.headers.authorization;
		const { userToBeFollowedId } = req.body;

		const tokenData = new Authenticator().validateToken(token);
		
		if(tokenData.userId === userToBeFollowedId) throw new Error('youCantFollowYourself');

		const checkIfUserExists = await new UserData().checkUserIdOnDatabase(userToBeFollowedId);
		const checkIfUserIsAlreadyFollowed = await new FollowersData().checkIfUserIsAlreadyAFollower(tokenData.userId, userToBeFollowedId);

		await Promise.all([checkIfUserExists, checkIfUserIsAlreadyFollowed]);

		const followerTableId = new IdGenerator().generateId();

		return await new FollowersData().insertNewFollowerData(followerTableId, tokenData.userId, userToBeFollowedId);
	}

	async unfollowUser(req: Request) {
		const token = req.headers.authorization;
		const { userToBeUnfollowedId } = req.body;

		const tokenData = new Authenticator().validateToken(token);
		
		if(tokenData.userId === userToBeUnfollowedId) throw new Error('youCantUnfollowYourself');

		const checkIfUserExists = new UserData().checkUserIdOnDatabase(userToBeUnfollowedId);
		const checkIfUserIsAlreadyFollowed = new FollowersData().checkIfUserIsAlreadyAFollower(tokenData.userId, userToBeUnfollowedId);

		await Promise.all([checkIfUserExists, checkIfUserIsAlreadyFollowed]);

		const followerTableId = new IdGenerator().generateId();

		return await new FollowersData().insertNewFollowerData(followerTableId, tokenData.userId, userToBeUnfollowedId);
	}
}