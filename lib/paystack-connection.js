'use strict';
var request = require('request'),
		_ = require('underscore'),
		Customer = require('./api/customer'),
		Transaction = require('./api/transaction'),
		Plan = require('./api/plan'),
		//Subscription = require('./api/subscription'),
		Page = require('./api/page');

function PaystackConnection(apiKey, hosted) {
	this.apiKey = apiKey;
	if (hosted == null) {
		hosted = true;
	}
	this.customer = new Customer();
	this.plan = new Plan();
	this.transaction = new Transaction();
}

PaystackConnection.prototype._request = function(options, callback) {
	var options = options || {};

	if (options.method == null) {
		options.method = 'GET';
	}
	Paystack = require('./paystack');
	if (options.endpoint) {
		if (options.url == null) {
			options.url = " " + Paystack.apiServer + options.endpoint;
		}
	}
	if (!options.formData) {
		if (options.body == null) {
			options.body = {};
		}
	}
	if (options.json == null) {
		options.json = true;
	}
	if (this.apiKey) {
		options.headers = {
			'Authorization': ['Bearer ', this.apiKey].join(''),
			'Content-Type': 'application/json'
		}
	}

	return request(options, function(error, response, body) {
		if (error || response.statusCode > 299) { 
			//if (!body.status || error == null) {
				//error = new Error(body.message);
				var error = new Error("Unexpected Status code: " + response.statusCode);
				return callback(error, null);
			//} else {
				try {
					if (_.isString(body)) {
						body = JSON.parse(body);
					} 
					return callback(null, body);
				} catch (e) {
						error = e;
						return callback(error);
					}
				//}
			}
	});
};

module.exports = PaystackConnection;