
import { Request, Response } from 'express';
import { app } from './controller/app';
import { SignUpController } from './controller/SignupController';



app.get('/signup', (req: Request, resp: Response) => {new SignUpController().createNewUser(req, resp);});
