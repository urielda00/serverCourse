import express from 'express';
import * as controllers from '../controllers/user.js';
import * as auth from '../middlewares/jwt.js';
import * as validation from '../middlewares/inputValidation.js';

const userRouter = express.Router();

// register
userRouter.post('/registerUser',validation.registerValidation, validation.ValidationResult,  controllers.registerUser);

// login
userRouter.post('/loginUser', validation.loginValidation, validation.ValidationResult, controllers.loginUser);

//delete
userRouter.post('/deleteUser', auth.isAdmin, controllers.deleteUser);

export default userRouter;
