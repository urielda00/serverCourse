import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		products: {
			type: [String],
			required: true,
		},
		totalItemsInCart: {
			type: Number,
		},
		totalPrice:{
			type:Number
		}
	},
	{ timestamps: true }
);

const Cart = mongoose.model('Cart', CartSchema);
export default Cart;