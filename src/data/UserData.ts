import { userRole } from '../model/User';
import DataBase from '../services/DataBase';

export default class UserData extends DataBase {	
	async insertUserData(userId: string, userName: string, userEmail: string, userPassword: string, userRole: userRole): Promise<any>{
		return await this.connection().table('users').insert({
			user_id: userId,
			user_name:userName,
			user_email:userEmail,
			user_password:userPassword,
			user_role: userRole
		});
	}

	async checkUserEmailOnDatabase(userEmail: string){
		return await this.connection().table('users').select('user_email').where('user_email', '=', userEmail)
			.then((response) => { 
				if(response[0]?.user_email) throw new Error('emailAlreadyInUse'); });
	}

	async getUserDataForLogin(userEmail: string){
		return await this.connection().table('users').select('user_id', 'user_password', 'user_role').where('user_email', '=', userEmail)
			.then((response): any => {
				if(!response[0]?.user_password) throw new Error('invalidParamtersForSignIn'); 
				return response[0];
			});
	}

	async getNonSensitiveData(userId: string){
		return await this.connection().table('users').select('user_id', 'user_name', 'user_email', 'user_role').where('user_id', '=', userId)
			.then((response): any => {
				if(!response[0]?.user_id) throw new Error('invalidParamtersForSignIn'); 
				return response[0];
			});
	}
}