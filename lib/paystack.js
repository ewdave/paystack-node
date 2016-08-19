'use strict';

Paystack.apiKey = null;

Paystack.API_SERVER = 'https://api.paystack.co';

Paystack.PaystackConnection = require('./paystack-connection');

function Paystack() {}

Paystack.prototype = {

	hostedAPI: function() {
		return (apiKey != null);
	},

	with: function(apiKey) {
		var hosted;
		if (apiKey == null) {
			throw new Error("This function requires a key");
		}
		return new Paystack.PaystackConnection(apiKey, hosted = this.hostedAPI);
	}
}

module.exports = Paystack;