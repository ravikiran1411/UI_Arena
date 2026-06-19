
import express from 'express'
import { adminLogin, getLeaderboard, userLogin, userRegister } from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const userRouter = express.Router();

userRouter.post('/register',userRegister);

userRouter.post('/login',userLogin);

userRouter.post('/adminlogin',adminLogin);

userRouter.post('/leaderboard',userAuth,getLeaderboard)

export default userRouter;
