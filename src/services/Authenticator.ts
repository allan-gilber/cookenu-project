import { userId, userRole } from '../model/User';
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

	validateToken = (token: string): userId | null =>{
		try{
			const tokenData = verify(  
				token,
                process.env.JWT_KEY as Secret
			) as JwtPayload;
			return { userId: tokenData.id };
		}catch (error){
			console.log(error, 'Failure in token validation.');
			return null;
		}
	};
}