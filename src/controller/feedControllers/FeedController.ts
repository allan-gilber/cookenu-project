import { Request, Response } from 'express';
import ErrorMessages from '../errorsControllers/MessageErrorsController';
import DataBase from '../../services/DataBase';
import FeedBusiness from '../../business/feedBusiness/FeedBusiness';

export default class FeedController extends DataBase {
	async getFeedData (req: Request, resp: Response) {
		try {
			const feedData = await new FeedBusiness().requestFeedData(req);
			resp.statusCode = 201;
			resp.send({data: feedData});
		} catch(error: any) {
			console.log('error in FeedController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);

			resp.send({message: errorMessage.message});
		} finally {
			this.closeConnection();
		}
		return;
	}
}