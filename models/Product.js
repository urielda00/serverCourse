import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
	{
		productName: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		quantity: { type: Number, required: true },
		productImages: [String],
		status: { type: String, required: true, enum: ['available', 'unavailable'], default: 'available' },
		company: { type: String, required: true },
		releaseYear: { type: Number, required: true },
		category: { type: String, required: true },
	},
	{ timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
