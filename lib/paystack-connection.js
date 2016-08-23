'use strict';
var request = require('request'),
		_ = require('underscore'),
		Customer = require('./api/customer'),
		Transaction = require('./api/transaction'),
		Plan = require('./api/plan'),
		Subscription = require('./api/subscription'),
		Page = require('./api/page');

function PaystackConnection(apiKey) {
	this.apiKey = apiKey;

	this.transaction = new Transaction(this);
	this.customer = new Customer(this);
	this.page = new Page(this);
	this.plan = new Plan(this);
	this.subscription = new Subscription(this);
}

PaystackConnection.prototype._request = function(options, callback) {
	var options = options || {};

	if (options.method == null) {
		options.method = 'GET';
	}
	if (options.endpoint) {
		if (options.url == null) {
			options.url = " " + 'https://api.paystack.co' + options.endpoint;
		}
	}
	if (!options.formData) {
		if (options.body == null) {
			options.body = {};
		}
	}
	if (!options.json) {
		options.json = true;
	}
	if (this.apiKey) {
		options.headers = {
			'Authorization': ['Bearer ', this.apiKey].join(''),
			'Content-Type': 'application/json'
		}
	}

	request(options, function(error, response, body) {
		if(!body.status) {
			error = new Error(body.message);
			body = null;
		}

		return callback(error, body);
	})
}

module.exports = PaystackConnection;