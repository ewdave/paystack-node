'use strict';

var request = require('request'),
		_ = require('underscore'),
		PaystackConnection = require('./paystack-connection');


function Paystack() {}

		Paystack.apiKey;

		Paystack.apiServer = 'https://api.paystack.co';

		Paystack.hostedAPI = function() {
			return (apiKey != null);
		};


		Paystack['with'] = function(apiKey) {
			var hosted;
			if (apiKey == null) {
				throw new Error("This function requires a key");
			}
			return new PaystackConnection(apiKey, hosted = this.hostedAPI);
		}

module.exports = Paystack;