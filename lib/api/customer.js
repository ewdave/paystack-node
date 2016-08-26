'use strict';

var _ = require('underscore'),
	END_POINT = '/customer';

function Customer(connection) {
	this.connection = connection;

	//'this.connection' will/should be an 'instanceof' require('../paystack-connection')
	// for PaystackConnection object provision
	this;
}


Customer.prototype = {

	create: function(params, callback) {
		
		return function() {
			var self = this;
			self.connection._request({
				method: 'POST',
				endpoint: END_POINT,
				body: params
			}, function(error, body) {
					if (error) {
						return callback(error, null);
					}

					return callback(null, body);
				}
			)
		};
	},

	update: function(id, params, callback) {

		return (function(_this) {
			_this.connection._request({
				method: 'PUT',
				endpoint: END_POINT + '/{id}',
				body: params
			}, function(error, body) {
					if (error) {
						return callback(error, null);
					}

					return callback(null, body);
				}
			)}
		)(this);
	},

	get: function(id, callback) {
		
		return (function(_this) {
			_this.connection._request({
				method: 'GET',
				endpoint: END_POINT + '/{id}'
			}, function(error, body) {
					if (error) {
						return callback(error, null);
					}

					return callback(null, body);
				}
			)}
		)(this);
	},

	list: function(params, callback) {
		var pagination;
		if (params == null) {
			params = {};
		}
		pagination = Infinity;
		if ('pagination' in params) {
			pagination = params['pagination'];
		}
		return (function(_this) {
			_this.connection._request({
				method: 'GET',
				endpoint: END_POINT,
				qs: _.extend({}, params, {
					perPage: pagination
				})
			}, function(error, bodyArray) {
					
					return callback(error, bodyArray);
				}
			)}
		)(this);	
	}
};

module.exports = Customer;
