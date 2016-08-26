'use strict';

var PaystackConnection = require('./paystack-connection');

var Paystack = module.exports = (function() {

	Paystack.BASE_URL = 'https://api.paystack.co';

	function Paystack() {}

	Paystack.with = function(apiKey) {
		if (apiKey == null) {
			throw new Error("This function requires a key");
		}
		return new PaystackConnection(apiKey);
	}

	return Paystack;
})();