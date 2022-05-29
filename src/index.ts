
import { Request, Response } from 'express';
import { app } from './controller/app';




app.get('/', (req: Request,res: Response) => res.status(200).send({message: 'hello world!'}));
