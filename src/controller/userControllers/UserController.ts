import { Request, Response } from 'express';
import AccountDataBusiness from '../../business/userBusiness/AccountDataBusiness';
import ErrorMessages from '../errorsControllers/MessageErrorsController';
import DataBase from '../../services/DataBase';

export default class UserController extends DataBase {

	async loginToServer (req: Request, resp: Response){
		try {
			const tokenRequest = await new AccountDataBusiness().loginRequest(req);

			resp.statusCode = 201;
			resp.send({ token: tokenRequest});
		} catch(error: any){
			console.log('error in SignInController:', error?.message);

			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);
			resp.statusCode = errorMessage.status;

			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}

	async createNewUser (req: Request, resp: Response){
		try {
			await new AccountDataBusiness().createUser(req);

			const successfulResult = new ErrorMessages().getErrorMessage('signUpsuccessful');

			resp.statusCode = successfulResult.status;
			resp.send({message: successfulResult.message});
		} catch(error: any){
			console.log('error in SignUpController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);
			resp.statusCode = errorMessage.status;

			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}

	async accountData (req: Request, resp: Response){
		try {
			const accountData = await new AccountDataBusiness().getAccountData(req);
			resp.statusCode = 201;
			resp.send({data: accountData});
		} catch(error: any) {
			console.log('error in UserController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);
			resp.statusCode = errorMessage.status;

			resp.send({message: errorMessage.message});
		} finally{
			this.closeConnection();
		}
		return;
	}

	async accountDataFromOtherUser (req: Request, resp: Response){
		try {
			const accountData = await new AccountDataBusiness().getAccountDataFromOtherUser(req);
			resp.statusCode = 201;
			resp.send({data: accountData});
		} catch(error: any) {
			console.log('error in UserController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);
			resp.statusCode = errorMessage.status;

			resp.send({message: errorMessage.message});
		} finally {
			this.closeConnection();
		}
		return;
	}

	async deleteAccount (req: Request, resp: Response) {
		try {
			const accountData = await new AccountDataBusiness().deleteAccount(req);
			console.log('finished');
			resp.statusCode = 201;
			resp.send({data: accountData});
		} catch(error: any) {
			console.log('error in UserController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);
			resp.statusCode = errorMessage.status;

			resp.send({message: errorMessage.message});
		} finally {
			this.closeConnection();
		}
		return;
	}

	async userPasswordReset(req: Request, resp: Response) {
		try{
			await new AccountDataBusiness().recoverPasswordLogic(req);
			console.log('finished');
			resp.statusCode = 201;
			resp.send({message: 'if theres a account with the email provided, a recovery link will be sent to your email.' });
		} catch(error: any) {
			console.log('ttt', error);
			// console.log('error in UserController:', error?.message);
			const errorMessage = new ErrorMessages().getErrorMessage(error?.message);
			resp.statusCode = errorMessage.status;

			resp.send({message: errorMessage.message});
		} finally {
			this.closeConnection();
		}
		return;
	}
}