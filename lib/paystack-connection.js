(function () {
	var _, Paystack, request, Customer, Transaction, Plan, Subscription, Page, PaystackConnection;

	_ = require('underscore');

	Paystack = require('./paystack');

	request = require('request');

	Customer = require('./models/customer');

	Transaction = require('./models/transacton');

	Plan = require('./models/plan');

	//Subscription = require('./models/subscription');

	Page = require('./models/page');

	module.exports = PaystackConnection = (function() {
		function PaystackConnection(apiKey, hosted) {
			this.apiKey = apiKey;
			if (hosted == null) {
				hosted = true;
			}
			this.customer = new Customer(this);
			this.transacton = new Transaction(this);
			this.plan = new Plan(this);
			this.page = new Page(this);
			this.usingHostedAPI = hosted;
		}

		PaystackConnection.prototype.usingHostedAPI = function() {};

		PaystackConnection.prototype._request = function(options, callback) {
			var options = options || {};

			if (options.method == null) {
				options.method = 'GET';
			}
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
					if (!body.status || error == null) {
						error = new Error(body.message);
						return callback(error, null);
					} else {
						try {
							if (_.isString(body)) {
								body = JSON.parse(body);
							} 
							return callback(null, body);
						} catch (e) {
								error = e;
								return callback(error);
							}
						}
					}
			});
		};

		return PaystackConnection;
	})();

}).call(this);