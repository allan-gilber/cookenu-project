import errorMessageBusiness from '../../business/errorBusiness/errorMessageBusiness';
import { errorMessage } from '../../model/Users';

export default class MessageErrorsController {
	getErrorMessage(errorCode: string): errorMessage {
		return new errorMessageBusiness().requestErrorMessage(errorCode);
	}
}