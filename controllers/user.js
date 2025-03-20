import User from '../models/User.js';
import * as tokenLogic from '../middlewares/jwt.js';
import { encrypt, decrypt } from '../middlewares/password.js';
import { userInfoLogger, userErrorLogger } from '../middlewares/logger.js';

// register
export const registerUser = async (req, res) => {
	try {
		const { userName, email, password } = req.body;

		// check if the user exist:
		const checkUserName = await User.findOne({ userName });
		const checkMail = await User.findOne({ email });
		if (checkMail || checkUserName) {
			res.status(409).json({ success: false, message: 'User already exist' });
			userErrorLogger.error('User already exist');
		} else {
			// create new user:
			const encryptedPass = encrypt(password);
			const newUser = new User({
				userName,
				email,
				password: encryptedPass,
			});
			await newUser.save();
			res.status(201).json({ success: true, message: 'User registered successfully' });
			userInfoLogger.info('User registered successfully');
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
		userErrorLogger.error(error.message);
	}
};

// login
export const loginUser = async (req, res) => {
	try {
		const { userName, password } = req.body;

		// find user by userName
		const user = await User.findOne({ userName });
		const isMatch = await decrypt(password, user.password);

		if (!user || !isMatch || user.status == 'unavailable') {
			res.status(409).json({ success: false, message: 'Invalid userName or password' });
			userErrorLogger.error('Invalid userName or password');
		} else {
			const token = tokenLogic.createToken(user._id, user.role);
			const setTimer = user.role == 'admin' ? 15 : 60; // 15m or 1h

			//send the token to the client side:
			res.cookie('loginToken', token, { ...cookieData, maxAge: setTimer * 60 * 1000 });
			res.status(200).json({ success: true, message: 'legged in successfully' });
			userInfoLogger.info('legged in successfully');
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
		userErrorLogger.error(error.message);
	}
};

//delete
export const deleteUser = async (req, res) => {
	try {
		const { userId } = req.body;
		const user = await User.findById(userId);
		if (user) {
			await User.findByIdAndUpdate(userId, { status: 'unavailable' }, { new: true });
			res.status(200).json({ message: 'user deleted successfully' });
			userInfoLogger.info('user deleted successfully');
		} else {
			res.status(404).json({ message: 'user not found' });
			userErrorLogger.error('user not found');
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
		userErrorLogger.error(error.message);
	}
};
