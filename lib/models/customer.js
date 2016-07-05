(function () {
	var Customer, _, BASE_END_POINT, PaystackConnection;

	_ = require('underscore');

	END_POINT = '/customer';

	PaystackConnection = require('../paystack-connection');

	module.exports = Customer = (function() {

		function Customer(connection) {
			this.connection = connection;
			if (!(this.connection instanceof PaystackConnection)) {
				throw new Error("Connection object not provided");
			}
			this;
		}

		Customer.prototype.create = function(params, callback) {
			if (params == null) {
				params = {};
			}
			return this.connection._request({
				method: 'POST',
				endpoint: END_POINT,
				body: _.extend({}, params, {
					email: email,
					first_name: first_name,
					last_name: last_name,
					phone: phone
				})
			}, function(error, body) {
					if (error) {
						return callback(error, null);
					}

					return callback(null, body);
				}
			);
		};

		Customer.prototype.update = function(id, params, callback) {
			if (params == null) {
				params = {}
			}
			return this.connection._request({
				method: 'PUT',
				endpoint: END_POINT + '/{id}',
				body: _.extend({}, params, {
					email: email,
					first_name: first_name,
					last_name: last_name,
					phone: phone
				})
		  }, function(error, body) {
					if (error) {
						callback(error, null);
					}

					return callback(null, body);
				}
			);
		};

		Customer.prototype["delete"] = function(id, params, callback) {
			if (params == null) {
				params = {};
			}
			return this.connection._request({
				method: 'DELETE',
				endpoint: END_POINT + '/{id}',
				qs: params
			}, function () {
				callback(null);
			});
		};

		Customer.prototype.get = function(id, callback) {
			return this.connection._request({
				method: 'GET',
				endpoint: END_POINT + '/{id}',
			}, function(error, body) {
					if (error) {
						return callback(error, null);
					}
					
					return callback(null, body);
				};
			);
		};

		Customer.prototype.list = function(params, callback) {
			var pagination;
			if (params == null) {
				params = {};
			}
			pagination = Infinity;
			if ('pagination' in params) {
				pagination = params['pagination'];
			}
			return this.connection._request({
				method: 'GET',
				endpoint: END_POINT,
				qs: _.extend({}, params, {
					perPage: pagination
				})
			}, function(error, bodyArray) {
					if (error) {
						return callback(error, null);
					}
					
					return callback(null, bodyArray);
				}
			);
		};

		return Customer;

	})();
}).call(this);