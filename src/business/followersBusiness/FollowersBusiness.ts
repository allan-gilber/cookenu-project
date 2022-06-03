import { Request } from 'express';
import FollowersData from '../../data/FollowersData';
import UserData from '../../data/UserData';
import Authenticator from '../../services/Authenticator';
import IdGenerator from '../../services/IdGenerator';

export default class FollowersBusiness {
	async followUser(req: Request) {
		const token = req.headers.authorization;
		const { userToBeFollowedId } = req.body;
		if(!userToBeFollowedId) throw new Error('invalidUserIdToBeFollowed');

		const tokenData = await new Authenticator().validateToken(token);
		if(tokenData.userId === userToBeFollowedId) throw new Error('youCantFollowYourself');

		const checkIfUserExists = new UserData().checkUserIdOnDatabase(userToBeFollowedId);
		const checkIfUserIsAlreadyFollowed = new FollowersData().checkFollowerTableFortIds(tokenData.userId, userToBeFollowedId);

		return await Promise.all([checkIfUserExists, checkIfUserIsAlreadyFollowed]).then(async ([firstPromisseResult, secondPromisseResultd]) =>{
			if(secondPromisseResultd) throw new Error('userIsAlreadyBeeingFollowed');

			const followerTableId = new IdGenerator().generateId();

			return await new FollowersData().insertNewFollowerData(followerTableId, tokenData.userId, userToBeFollowedId);
		});
	}

	async unfollowUser(req: Request) {
		const token = req.headers.authorization;
		const { userToBeUnfollowedId } = req.body;
		if(!userToBeUnfollowedId) throw new Error('invalidUserIdToBeUnfollowed');

		const tokenData = await new Authenticator().validateToken(token);

		if(tokenData.userId === userToBeUnfollowedId) throw new Error('youCantUnfollowYourself');

		const checkIfUserExists = new UserData().checkUserIdOnDatabase(userToBeUnfollowedId);
		const checkIfUserIsFollowed = new FollowersData().checkFollowerTableFortIds(tokenData.userId, userToBeUnfollowedId);

		return await Promise.all([checkIfUserExists, checkIfUserIsFollowed]).then(async ([firstPromisseResult, secondPromisseResultd]) =>{
			if(!secondPromisseResultd) throw new Error('userIsNotBeeingFollowed');

			return await new FollowersData().deleteFollowingUserData(tokenData.userId, userToBeUnfollowedId);
		});
	}
}