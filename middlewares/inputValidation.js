import { check, validationResult } from 'express-validator';

export const ValidationResult = (req, res, next) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		const resultArr = [];
		const error = result.array();

		for (let i = 0; i < error.length; i++) {
			resultArr.push(error[i].msg);
		}
		return res.status(422).json({ success: false, error: resultArr }).send();
	}
	next();
};

//Cart
// addToCart:
export const addToCartValidation = [
	check('userId').trim().notEmpty().withMessage('UserId is required').isMongoId().withMessage('Invalid user Id'),
	check('productId').trim().notEmpty().withMessage('productId is required').isMongoId().withMessage('Invalid productId'),
];

// remove
export const removeCartItemValidation = [
	check('userId').trim().notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid user Id'),

	check('productId').trim().notEmpty().withMessage('Product ID is required').isString().withMessage('Product ID must be a string'),
];

//Order----------------------------------------------------
// place
export const placeOrderValidation = [
	check('userId').trim().notEmpty().withMessage('User ID is required').isMongoId().withMessage('Invalid User ID format'),

	check('products').isArray({ min: 1 }).withMessage('Products array must contain at least one product'),
	check('totalPrice').isNumeric({ min: 0 }).withMessage('Total price must be a positive number').notEmpty().withMessage('Total price is required'),
];

//Product -----------------------------------------------------
//create
export const createProductValidation = [
	check('productName').trim().notEmpty().withMessage('Product name is required'),

	check('description').trim().notEmpty().withMessage('Description is required'),

	check('price').isFloat({ min: 0 }).withMessage('Price must be a positive number').notEmpty().withMessage('Price is required'),

	check('quantity').trim().notEmpty().withMessage('Quantity is required'),

	check('status').isIn(['available', 'unavailable']).withMessage('Status must be either available or unavailable'),

	check('company').trim().notEmpty().withMessage('Company is required'),
	check('releaseYear')
		.isInt({ min: 1900, max: new Date().getFullYear() })
		.withMessage('Release year must be a valid year')
		.notEmpty()
		.withMessage('Release year is required'),
	check('category').trim().notEmpty().withMessage('Category is required'),
];

//User   -----------------------------------------------------
// register
export const registerValidation = [
	check('userName')
		.trim()
		.notEmpty()
		.withMessage('Username is required')
		.isLength({ min: 2, max: 15 })
		.withMessage('Username must be between 2 to 15 characters'),

	check('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),

	check('password').trim().notEmpty().withMessage('Password is required').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
];

//login
export const loginValidation = [
	check('userName')
		.trim()
		.notEmpty()
		.withMessage('Username is required')
		.isLength({ min: 2, max: 15 })
		.withMessage('Username must be between 2 to 15 characters'),

	check('password').trim().notEmpty().withMessage('Password is required'),
];
