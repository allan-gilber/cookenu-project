export enum USER_ROLES{
	USER = 'USER',
	ADMIN = 'ADMIN',
}

export interface userId {
	userId: string,
}

export interface userRole extends userId {
	userRole: USER_ROLES.ADMIN | USER_ROLES.USER
}
export interface userCredentials extends userId {
	userEmail: string,
	userPassword: string,
}
export interface user extends userId, userCredentials{
	name:string
}
export interface errorMessage {
	status: number,
	message: string
}
