import { errorMessagesData } from '../../data/errorMessageData/errorMessageData';
import { errorMessage } from '../../model/Users';

export default class errorMessageBusiness {
	private errorMessagesObject = errorMessagesData;

	requestErrorMessage(errorCode: string): errorMessage{
		return this.errorMessagesObject[errorCode] ? this.errorMessagesObject[errorCode] : this.errorMessagesObject['genericError'];
	}
}