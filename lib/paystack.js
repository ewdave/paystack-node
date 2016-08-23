'use strict';

var PaystackConnection = require('./paystack-connection');

module.exports = {

	with: function(apiKey) {
		if (apiKey == null) {
			throw new Error("This function requires a key");
		}
		return new PaystackConnection(apiKey);
	}
}