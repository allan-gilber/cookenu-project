export async const insertUserData = (userId: string, userName: string, userEmail: string, userPassword: string, userRole: 'ADMIN' | 'USER'): Promise<any> => {
	return await this.connection().table('users').insert({
		user_id: userId,
		user_name:userName,
		user_email:userEmail,
		user_password:userPassword,
		user_role: userRole
	});
};