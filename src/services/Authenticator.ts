import { userRole } from '../model/User';
import { config } from 'dotenv';
import { JwtPayload, Secret, sign, verify } from 'jsonwebtoken';


export default class Authenticator {
	generateNewToken = async ( payload: userRole ) =>{
		config();

		return sign(
			payload,
                process.env.JWT_KEY as Secret,
                { expiresIn: '2h' }
		);
	};

	validateToken = (token: string | undefined): userRole => {
		if(!token) throw new Error('invalidToken');
		config();
		try{
			const tokenData = verify(  
				token,
                process.env.JWT_KEY as Secret
			) as JwtPayload;
			return { userId: tokenData.userId, userRole: tokenData.userRole };
		} catch (error){
			console.log('Failure in token validation.');
			throw new Error('invalidToken');
		}
	};

	verifySecretPassword = (secretPassword: string): void => {
		config();
		if(!process.env.SECRET_PASS){
			console.log('Please, configure the secret password for "admin" role creation');
			throw new Error('genericError');
		}
		if(!(secretPassword === process.env.SECRET_PASS)) throw new Error('emptyParamtersForSignup');
		return;
	};
}