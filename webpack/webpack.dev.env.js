const utils = require('./utils.js');

let data = {
	NODE_ENV: `'development'`,
	BUILD_TIMESTAMP: `'${utils.getTimestamp()}'`,
	DEBUG_INFO_ENABLED: true,
	VERSION: `'${utils.getVersion()}'`,
	BUNDLE_NAME: `'botsan-widget.${utils.getVersion()}'`,
	SERVER_API_URL: `'https://<URL_API_AI>'`,
	WEBPACK_PROXY_TARGET: `''`,
	BASE_HREF: `'/'`,
};

module.exports = {
	data
};
