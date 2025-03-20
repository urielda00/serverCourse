import Order from '../models/Order.js';
import { orderErrorLogger, orderInfoLogger } from '../middlewares/logger.js';

// place order
export const placeOrder = async (req, res) => {
	try {
		const { userId, products, totalPrice } = req.body;
		const newOrder = new Order({
			userId,
			products,
			totalPrice,
		});
		await newOrder.save();

		res.status(201).json({ message: 'Order places successfully' });
		orderInfoLogger.info('Order places successfully');
	} catch (error) {
		res.status(500).json({ message: error.message });
		orderErrorLogger.error(error.message);
	}
};

// get order
export const getOrder = async (req, res) => {
	try {
		const { userId } = req.body;
		const order = await Order.findOne({ userId });

		if (!order) {
			res.status(404).json({ message: 'order not found', order: false });
			orderErrorLogger.error('order not found');
		} else {
			res.status(200).json({ message: 'order found', order });
			orderInfoLogger.info('order found');
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
		orderErrorLogger.error(error.message);
	}
};
