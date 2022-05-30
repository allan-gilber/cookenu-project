import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export default class HashManager{
	createHash = (plaintText: string) =>{
		const salt = genSaltSync(12);

		const cypherText = hashSync(plaintText, salt);

		return cypherText;
	};

	compareHashs = (plaintText: string, cypherText: string) => {
		return compareSync(plaintText, cypherText);
	};
}