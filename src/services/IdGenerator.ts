import { v4 } from 'uuid';

export class IdGenerator {
	generateId = () => v4();
}