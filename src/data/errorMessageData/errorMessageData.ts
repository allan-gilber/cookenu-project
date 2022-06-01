import { errorMessage } from '../../model/User';

export const errorMessagesData: {[key: string]: errorMessage} = {
	genericError: {status: 500, message:'oops, something went wrong!'},
	// empty/incomplete
	emptyParamtersForSignup: {status: 400,message:'please, provide a valid name, email, password and role.'},
	passwordMinimumLength: {status: 400, message:'please, you password must be atleast 6 or more characters.'},
	postEditMinimumLength: {status: 400, message:'please, the paramters for title and/or description must contain at least 3 characters.'},
	// invalid
	invalidRole: {status: 400, message:'please, provide a valid role for your account.'},
	invalidParamtersForSignIn: {status: 400,message:'invalid credentials!'},
	invalidParamtersForRecipeCreation: {status: 400, message: 'please, provide a valid title and description of the recipe.'},
	invalidParamtersForRecipeEdit: {status: 400, message: 'please, provide at least one paramter(valid title and/or description) and a valid recipe id to edit the recipe.'},
	invalidUserId: {status: 400, message: 'invalid userId'},
	invalidUserIdToBeFollowed: {status: 400, message: 'invalid userId to be followed!'},
	invalidUserIdToBeUnfollowed: {status: 400, message: 'invalid userId to be unfollowed!'},
	invalidToken: {status: 401, message: 'this endpoint requires a valid authorization header.'},
	invalidRecipeId: {status: 400, message: 'please, provide a valid recipe id.'},
	// already in use
	emailAlreadyInUse: {status: 403, message:'the email provided is already in use.'},
	// impossibility to change or to do
	userIsAlreadyBeeingFollowed: {status: 403, message: 'user is already beeing followed!'},
	userIsNotBeeingFollowed: {status: 403, message: 'user is not beeing followed!'},
	youCantFollowYourself: {status: 403, message: 'one doesn\'t simply follow itself.'},
	youCantUnfollowYourself: {status: 403, message: 'you run from yourself!'},
	cantEditTheRecipe: {status: 401, message: 'you don\'t have authorization to edit the post.' },
	unauthorized: {status: 401, message: 'you don\'t have authorization.' },
	unableToSelfDestruct: {status: 400, message: 'you can\'t delete your own account.'},
	// successful
	signUpsuccessful: {status: 201, message: 'user successful created!'}
};