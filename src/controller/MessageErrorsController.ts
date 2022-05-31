import { errorMessage } from '../model/User';
import errorMessagesData from '../business/errorMessagesDataBusiness';

export default class ErrorMessages {
	private errorMessagesObject = errorMessagesData;

	getErrorMessage(errorCode: string): errorMessage{
		return this.errorMessagesObject[errorCode] ? this.errorMessagesObject[errorCode] : this.errorMessagesObject['genericError'];
	}
}