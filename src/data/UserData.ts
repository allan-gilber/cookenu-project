import { userTokenData, USER_ROLES } from '../model/Users';
import DataBase from '../services/DataBase';

export default class UserData extends DataBase {	
	async insertUserData(userId: string, userName: string, userEmail: string, userPassword: string, userRole: USER_ROLES): Promise<any> {
		return await this.connection().table('users').insert({
			user_id: userId,
			user_name:userName,
			user_email:userEmail,
			user_password:userPassword,
			user_role: userRole
		});
	}

	async checkUserEmailOnDatabase(userEmail: string){
		(111);
		return await this.connection().table('users').select('user_id', 'user_role', 'user_email', 'user_name').where('user_email', '=', userEmail).then((response)=> response[0]);
	}

	async checkUserIdOnDatabase(userId: string){
		return await this.connection().table('users').select('user_id').where('user_id', '=', userId)
			.then((response): any => {
				if(!response[0]?.user_id) throw new Error('invalidUserId'); 
				return response[0];
			});
	}

	async requestUserDataForLogin(userEmail: string){
		return await this.connection().table('users').select('user_id', 'user_password', 'user_role', 'user_email').where('user_email', '=', userEmail)
			.then((response): any => {
				if(!response[0]?.user_password) throw new Error('invalidParamtersForSignIn'); 
				return response[0];
			});
	}

	async requestNonSensitiveData(userId: string) {
		return await this.connection().table('users').select('user_id', 'user_name', 'user_email').where('user_id', '=', userId)
			.then((response): any => {
				if(!response[0]?.user_id) throw new Error('invalidParamtersForSignIn'); 
				return response[0];
			});
	}

	async requestDeleteAccountData(userId: string) {
		return await this.connection().transaction(async (transaction) =>{
			await transaction.table('followers').where({follower_id: userId}).orWhere({followed_id: userId}).del();
			await transaction.table('recipes').where({recipe_creator_id: userId}).del();
			await transaction.table('users').where({user_id: userId}).del();
		});
	}

	async requestPasswordEdit(newPasswordHash: string, userEmail: string){
		return await this.connection().table('users').update({user_password: newPasswordHash}).where({user_email: userEmail});
	}
}