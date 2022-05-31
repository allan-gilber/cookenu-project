
import { Request, Response } from 'express';
import app from './controller/app';
import AccountDataController from './controller/getAccountDataController';
import SignInController from './controller/SignInController';
import SignUpController from './controller/SignUpController';



app.get('/signIn', (req: Request, resp: Response) => new SignInController().loginToServer(req, resp));
app.get('/getAccountInformation/', (req: Request, resp: Response) => new AccountDataController().getAccountData(req, resp));

app.post('/signUp', (req: Request, resp: Response) => new SignUpController().createNewUser(req, resp));

