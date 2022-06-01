
import { Request, Response } from 'express';
import app from './controller/app';
import FeedController from './controller/feedControllers/FeedController';
import FollowersController from './controller/followersControllers/FollowersController';
import RecipeController from './controller/recipeControllers/RecipeController';
import UserController from './controller/userControllers/UserController';



app.get('/signin', (req: Request, resp: Response) => new UserController().loginToServer(req, resp));
app.get('/user/profile', (req: Request, resp: Response) => new UserController().accountData(req, resp));
app.get('/user/:userId/', (req: Request, resp: Response) => new UserController().accountDataFromOtherUser(req, resp));
app.get('/feed/user-feed', (req: Request, resp: Response) => new FeedController().getFeedData(req, resp));


app.post('/signup', (req: Request, resp: Response) => new UserController().createNewUser(req, resp));
app.post('/followers/follow-user', (req: Request, resp: Response) => new FollowersController().followUser(req, resp));
app.post('/recipe/create-new-recipe', (req: Request, resp: Response) => new RecipeController().createRecipe(req, resp));

app.put('/recipe/edit-recipe', (req: Request, resp: Response) => new RecipeController().editRecipe(req, resp));

app.delete('/followers/unfollow-user', (req: Request, resp: Response) => new FollowersController().unfollowUser(req, resp));
app.delete('/recipe/delete', (req: Request, resp: Response) => new RecipeController().deleteRecipe(req, resp));
app.delete('/user/account-delete', (req: Request, resp: Response) => new UserController().deleteAccount(req, resp));

