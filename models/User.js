import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
		},
		password: { type: String, required: true, min: 5 },
		email: { type: String, required: true, max: 50, unique: true },
		orders: { type: [String], required: true },
		role: { type: String, required: true, enum: ['admin', 'user'], default: 'user' },
		status: { type: String, required: true, enum: ['available', 'unavailable'], default: 'available' },
	},
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;
