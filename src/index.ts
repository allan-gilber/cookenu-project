
import { Request, Response } from 'express';
import app from './controller/app';
import SignInController from './controller/SignInController';
import SignUpController from './controller/SignUpController';



app.get('/signIn', (req: Request, resp: Response) => new SignInController().loginToServer(req, resp));

app.post('/signUp', (req: Request, resp: Response) => new SignUpController().createNewUser(req, resp));

