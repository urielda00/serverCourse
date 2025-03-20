import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { cartErrorLogger, cartInfoLogger } from '../middlewares/logger.js';

// add to cart
export const addToCart = async (req, res) => {
	try {
		const { userId, productId } = req.body;
		const cart = await Cart.findOne({ userId });
		const product = await Product.findById(productId);
		if (product) {
			if (!cart) {
				const products = [];
				products.push(productId);
				newCart = new Cart({ userId, products, totalItemsInCart: 1, totalPrice: product.price });
				await newCart.save();
			} else {
				const tempProducts = cart.products;
				tempProducts.push(productId);
				const changes = {
					userId,
					products: tempProducts,
					totalItemsInCart: tempProducts.length,
					totalPrice: cart.totalItemsInCart + product.price,
				};
				const options = { new: true };
				await Cart.findByIdAndUpdate(cart._id, changes, options);
			}
		} else {
			res.status(401).json({ message: 'Invalid product' });
			cartErrorLogger.error('Invalid product');
		}
		res.status(200).json({ message: 'Product added to cart' });
		cartInfoLogger.info('Product added to cart');
	} catch (error) {
		res.status(500).json({ message: error.message });
		cartErrorLogger.error(error.message);
	}
};

// get cart
export const getCart = async (req, res) => {
	try {
		const { userId } = req.body;
		const cart = await Cart.findOne({ userId });
		if (!cart) {
			res.status(404).json({ success: false, message: 'Cart not found', cart: false });
			cartErrorLogger.error('Cart not found');
		} else {
			res.status(200).json({ success: true, message: 'Fetched cart', cart });
			cartInfoLogger.info('Fetched cart');
		}
	} catch (error) {
		res.status(500).json({ success: false, message: error.message, cart: false });
		cartErrorLogger.error(error.message);
	}
};

// remove from cart
export const removeFromCart = async (req, res) => {
	try {
		const { userId, productId } = req.body;
		const cart = await Cart.findOne({ userId });

		if (!cart) {
			res.status(404).json({ message: 'Cart not found', success: false });
			cartErrorLogger.error('Cart not found');
		} else {
			const productIndex = cart.products.indexOf(productId); // -1 if not found
			if (productIndex != -1) {
				cart.products = cart.products.filter((product) => product !== productId);
				await cart.save();
				res.status(201).json({ message: 'removed product from cart', success: true });
				cartInfoLogger.info('removed product from cart');
			} else {
				res.status(404).json({ message: 'Product not found', success: false });
				cartErrorLogger.error('Product not found');
			}
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
		cartErrorLogger.error(error.message);
	}
};

// delete cart
export const deleteCart = async (req, res) => {
	try {
		const { userId } = req.body;
		const cart = await Cart.findOne({ userId });

		if (!cart) {
			res.status(404).json({ message: 'Cart not found', success: false });
			cartErrorLogger.error('Cart not found');
		} else {
			await Cart.findOneAndDelete({ userId });
			res.status(200).json({ message: 'deleted cart', success: true });
			cartInfoLogger.info('deleted cart');
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
		cartErrorLogger.error(error.message);
	}
};
