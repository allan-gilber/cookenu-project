import { Request } from 'express';
import FeedData from '../../data/FeedData';
import Authenticator from '../../services/Authenticator';

export default class FeedBusiness {

	async requestFeedData(req: Request) {
		const token = req.headers.authorization;

		const tokenData = await new Authenticator().validateToken(token);

		return await new FeedData().requestUserFeed(tokenData.userId);
	}
}