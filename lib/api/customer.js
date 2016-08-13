'use strict';

var _ = require('underscore'),
	END_POINT = '/customer';

function Customer() {}


Customer.prototype = {

	create: function(params, callback) {
		var params = params || ['email', 'first_name', 'last_name', 'phone'];
		
		return (function() {
			return this._request({
			method: 'POST',
			endpoint: END_POINT,
			body: params
		}, function(error, body) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, body);
			}
		)}).bind(this);
	},

	update: function(id, params, callback) {
		var self = this;
		var params = params || ['email', 'first_name', 'last_name', 'phone'];

		return (function() {
			return this._request({
			method: 'PUT',
			endpoint: END_POINT + '/{id}',
			body: params
		}, function(error, body) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, body);
			}
		)}).bind(this);
	},

	get: function(id, callback) {
		
		return (function() {
			return this._request({
			method: 'GET',
			endpoint: END_POINT + '/{id}',
			body: params
		}, function(error, body) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, body);
			}
		)}).bind(this);
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
		return (function() {
			this._request({
				method: 'GET',
				endpoint: END_POINT,
				qs: _.extend({}, params, {
					perPage: pagination
			})
		}, function(error, bodyArray) {
				
				return callback(error, bodyArray);
			}
		)}).bind(this);	
	}
};

module.exports = Customer;