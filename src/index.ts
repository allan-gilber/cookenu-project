
import { Request, Response } from 'express';
import app from './controller/app';
import FeedController from './controller/feedControllers/FeedController';
import FollowersController from './controller/followersControllers/FollowersController';
import RecipeController from './controller/recipeControllers/RecipeController';
import AccountDataController from './controller/userControllers/getAccountDataController';
import SignInController from './controller/userControllers/SignInController';
import SignUpController from './controller/userControllers/SignUpController';



app.get('/signIn', (req: Request, resp: Response) => new SignInController().loginToServer(req, resp));
app.get('/getAccountInformation/', (req: Request, resp: Response) => new AccountDataController().getAccountData(req, resp));
app.get('/feed/userFeed', (req: Request, resp: Response) => new FeedController().getFeedData(req, resp));


app.post('/signUp', (req: Request, resp: Response) => new SignUpController().createNewUser(req, resp));
app.post('/followers/followUser', (req: Request, resp: Response) => new FollowersController().createRecipe(req, resp));
app.post('/recipe/createNewRecipe', (req: Request, resp: Response) => new RecipeController().createRecipe(req, resp));
