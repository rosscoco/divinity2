import winston from 'winston';

function Logger() {
	const logger = winston.createLogger({ transports: [
		new winston.transports.File({ level: 'info',
			filename: './logs/all-logs.log',
			handleExceptions: true,
			json: false,
			maxsize: 5242880, // 5MB
			maxFiles: 5,
			colorize: false }),
		new winston.transports.Console({ level: 'debug',
			handleExceptions: true,
			json: false,
			colorize: true })
	],
	exitOnError: false });

	return logger;
}

export default Logger;

// module.exports = logger;
// module.exports.stream = { write(message, encoding) {
// 	logger.info(message);
// } };
