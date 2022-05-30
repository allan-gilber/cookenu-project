import { errorMessage } from '../../../model/User';

const errorMessagesData: {[key: string]: errorMessage} = {
	genericError: {status: 500, message:'oops, something went wrong!'},
	emptyParamtersForSignup: {status: 400,message:'please, provide a valid name, email, password and role.'},
	passwordMinimumLength: {status: 400, message:'please, you password must be atleast 6 or more characters.'},
	invalidRole: {status: 400, message:'please, provide a valid role for your account.'},
	invalidParamtersForSignIn: {status: 400,message:'invalid credentials!'},
	emailAlreadyInUse: {status: 400, message:'the email provided is already in use.'},
	signUpSuccesfull: {status: 201, message: 'user succesfull created!'}
};

export default errorMessagesData;