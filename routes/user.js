import express from 'express';
import * as controllers from '../controllers/user.js';

const userRouter = express.Router();

// register
userRouter.post('/registerUser',controllers.registerUser);

// login
userRouter.post('/loginUser',controllers.loginUser);

//delete
userRouter.post('/deleteUser',controllers.deleteUser);


export default userRouter;