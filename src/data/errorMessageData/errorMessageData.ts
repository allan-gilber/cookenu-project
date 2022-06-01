import { errorMessage } from '../../model/User';

export const errorMessagesData: {[key: string]: errorMessage} = {
	genericError: {status: 500, message:'oops, something went wrong!'},
	emptyParamtersForSignup: {status: 400,message:'please, provide a valid name, email, password and role.'},
	passwordMinimumLength: {status: 400, message:'please, you password must be atleast 6 or more characters.'},
	invalidRole: {status: 400, message:'please, provide a valid role for your account.'},
	invalidParamtersForSignIn: {status: 400,message:'invalid credentials!'},
	emailAlreadyInUse: {status: 400, message:'the email provided is already in use.'},
	signUpsuccessful: {status: 201, message: 'user successful created!'},
	invalidUserId: {status: 400, message: 'invalid userId'},
	invalidUserIdToBeFollowed: {status: 400, message: 'invalid userId to be followed!'},
	invalidUserIdToBeUnfollowed: {status: 400, message: 'invalid userId to be unfollowed!'},
	invalidToken: {status: 400, message: 'this endpoint requires a valid authorization header.'},
	invalidParamtersForRecipeCreation: {status: 400, message: 'please, provide a valid title and description of the recipe.'},
	userIsAlreadyBeeingFollowed: {status: 400, message: 'user is already beeing followed!'},
	userIsNotBeeingFollowed: {status: 400, message: 'user is not beeing followed!'},
	youCantFollowYourself: {status: 400, message: 'one doesn\'t simply follow itself.'},
	youCantUnfollowYourself: {status: 400, message: 'you run from yourself!'}
};