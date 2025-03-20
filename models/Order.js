import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		products: {
			type: [String],
			required: true,
		},
		totalPrice:{
			type: Number,
			required: true,
		}
	},
	{ timestamps: true }
);

const Order = mongoose.model('Order', OrderSchema);
export default Order;
