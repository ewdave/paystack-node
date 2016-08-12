'use strict';

var request = require('request'),
	_ = require('underscore'),
	PaystackConnection = require('./paystack-connection');

module.exports = Paystack = function() {
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

};