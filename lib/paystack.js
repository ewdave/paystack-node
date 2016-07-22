(function () {
	var Paystack, request, _, PaystackConnection;

	_ = require('underscore');

	request = require('request');

	PaystackConnection = require('./paystack-connection');

	Paystack = (function() {
		function Paystack() {}

		Paystack.apiKey = null;

		Paystack.apiServer = 'https://api.paystack.co';

		Paystack.hostedAPI = function() {
			return (this.apiKey != null);
		};

		Paystack['with'] = function(apiKey) {
			var hosted;
			if (apiKey == null) {
				throw new Error("This function requires a key");
			}
			return new PaystackConnection(apiKey, hosted = this.hostedAPI);
		};

		return Paystack;

	})();

	module.exports = Paystack;
	
}).call(this);
