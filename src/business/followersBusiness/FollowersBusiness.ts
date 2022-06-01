import { Request } from 'express';
import FollowersData from '../../data/FollowersData';
import UserData from '../../data/UserData';
import Authenticator from '../../services/Authenticator';
import IdGenerator from '../../services/IdGenerator';

export default class FollowersBusiness {
	async followUser(req: Request) {
		const token = req.headers.authorization;
		const { userToBeFollowedId } = req.body;
		const tokenData = new Authenticator().validateToken(token);
		
		if(tokenData.userId === userToBeFollowedId) throw new Error('youCantFollowYourself');
		const checkIfUserExists = await new UserData().checkUserIdOnDatabase(userToBeFollowedId);
		const checkIfUserIsAlreadyFollowed = await new FollowersData().checkFollowerTableFortIds(tokenData.userId, userToBeFollowedId);
		await Promise.all([checkIfUserExists, checkIfUserIsAlreadyFollowed]);
		if(checkIfUserIsAlreadyFollowed[0]) throw new Error('userIsAlreadyBeeingFollowed');
		const followerTableId = new IdGenerator().generateId();
		return await new FollowersData().insertNewFollowerData(followerTableId, tokenData.userId, userToBeFollowedId);
	}
	async unfollowUser(req: Request) {
		const token = req.headers.authorization;
		const { userToBeUnfollowedId } = req.body;
		const tokenData = new Authenticator().validateToken(token);
		
		if(tokenData.userId === userToBeUnfollowedId) throw new Error('youCantUnfollowYourself');
		const checkIfUserExists = new UserData().checkUserIdOnDatabase(userToBeUnfollowedId);
		const checkIfUserIsFollowed = new FollowersData().checkFollowerTableFortIds(tokenData.userId, userToBeUnfollowedId);
		await Promise.all([checkIfUserExists, checkIfUserIsFollowed]);
		console.log(checkIfUserIsFollowed);
		if(!checkIfUserIsFollowed) throw new Error('userIsNotBeeingFollowed');
		const followerTableId = new IdGenerator().generateId();
		return await new FollowersData().insertNewFollowerData(followerTableId, tokenData.userId, userToBeUnfollowedId);
	}
}