var	_ = require('underscore');

utils = require('../utils');

END_POINT = '/plan';

module.exports = function() {

	function Plan(connection) {
		this.connection = connection;
		if (!(this.connection instanceof require('../paystack-connection'))) {
			throw new Error("Connection object not provided");
		}
		this;
	}
	
	Plan.prototype.create = function(params, callback) {
		params = params || ['name', 'description', 'amount', 'interval', 'send_invoices', 'send_sms', 'hosted_page', 'hosted_page_url', 'hosted_page_summary', 'currency'];
		
		return this.connection._request({
			method: 'POST',
			endpoint: '/plan',
			body: params
		}, function(error, body) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, body);
			}
		);
	};

	Plan.prototype.update = function(id, params, callback) {
		params = params || ['name', 'description', 'amount', 'interval', 'send_invoices', 'send_sms', 'hosted_page', 'hosted_page_url', 'hosted_page_summary', 'currency'];

		return this.connection._request({
			method: 'PUT',
			endpoint: END_POINT + '/{id}',
			body: params
	  }, function(error, body) {
				if (error) {
					return callback(error, null)
				}

				return callback(null, body);
			}
		);
	};

	Plan.prototype["delete"] = function(id, params, callback) {
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

	Plan.prototype.get = function(id, callback) {
		return this.connection._request({
			method: 'GET',
			endpoint: END_POINT + '/{id}',
		}, function(error, body) {
				if (error) {
					return callback(error);
				}
				
				return callback(null, body);
			}
		);
	};

	Plan.prototype.list = function(params, callback) {
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

	return Plan;

};