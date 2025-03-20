import bcrypt from 'bcryptjs';

// encrypt
export const encrypt = async (password) => {
	const salt = await bcrypt.genSalt();
	return await bcrypt.hash(password, salt);
};

// decrypt
export const decrypt = async (password, hashedPass) => {
	return await bcrypt.compare(password, hashedPass);
};
