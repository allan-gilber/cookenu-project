import { DataBase } from '../services/DataBase';

export class UserData extends DataBase{
	
    
	async insertUserData(userId: string, userName: string, userEmail: string, userPassword: string): Promise<any>{
		await this.connection().table('users').insert({
			user_id: userId,
			user_name:userName,
			user_email:userEmail,
			user_password:userPassword
		});
	}
}