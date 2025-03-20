import winston from 'winston';

const { transports, format, createLogger } = winston;
const { combine, printf, timestamp } = format;

// custom log format
const customLogFormat = printf(({ level, message, timestamp }) => {
	return `Level:[${level}] LogTime: [${timestamp}] Message:-[${message}]`;
});

// function to create logger based on category:
const createCategoryLogger = (category, logLevel) => {
	return createLogger({
		format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), customLogFormat),
		transports: [
			new transports.File({
				filename: `logs/${category}/${logLevel}.log`,
				level: logLevel,
			}),
		],
	});
};

// define the loggers
export const userInfoLogger = createCategoryLogger('user', 'info');
export const userErrorLogger = createCategoryLogger('user', 'error');

export const productInfoLogger = createCategoryLogger('product', 'info');
export const productErrorLogger = createCategoryLogger('product', 'error');

export const orderInfoLogger = createCategoryLogger('order', 'info');
export const orderErrorLogger = createCategoryLogger('order', 'error');

export const cartInfoLogger = createCategoryLogger('cart', 'info');
export const cartErrorLogger = createCategoryLogger('cart', 'error');