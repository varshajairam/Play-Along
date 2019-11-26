const winston = require('winston');

function getLogger() {
	return winston.createLogger({
		level: 'info',
	  	format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
	  	defaultMeta: { service: 'user-service' },
	  	transports: [
	  		new winston.transports.File({ filename: 'error.log', level: 'error', timestamp: true }),
	  		new winston.transports.File({ filename: 'combined.log', timestamp: true })
	  	]
	});
}

module.exports = getLogger();