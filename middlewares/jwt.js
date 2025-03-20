import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//configuration
dotenv.config();
const secret = process.env.JWT_CODE;

//login
export const createToken = (userId, userRole) => {
	const expiresIn = userRole == 'admin' ? '15m' : '1h';
	return jwt.sign({ userId, role: userRole }, secret, { expiresIn });
};

// verify
const verifyToken = (req, res, next, role) => {
	const token = req.headers['authorization']?.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'Token not found' });
	}

	jwt.verify(token, secret, (err, decode) => {
		if (err) {
			return res.status(403).json({ message: 'Token is invalid or expired' });
		}

		req.user = decode;
		if (!role.includes(decode.role)) {
			return res.status(403).json({ message: 'you do not have access' });
		}

		next();
	});
};

// the actual verify:
export const isAdmin = (req, res, next) => {
	verifyToken(req, res, next, ['admin']);
};


export const isUser = (req, res, next) => {
	verifyToken(req, res, next, ['user']);
};


export const adminOrUser = (req, res, next) => {
	verifyToken(req, res, next, ['admin','user']);
};