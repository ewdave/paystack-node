var	_ = require('underscore'),
	END_POINT = '/subscription';

function Subscription(connection) {
	this.connection = connection;
	if (!(this.connection instanceof require('../paystack-connection'))) {
		throw new Error("Connection object not provided");
	}
	this;
}

Subscription.prototype = {

	create: function(params, callback) {

		return (function() {
			this.connection._request({
				method: 'POST',
				endpoint: END_POINT,
				body: params
			}, function(error, body) {
				if (error) {
					return callback(error, null)
				}

				return callback(null, body)
			})
		}).bind(this)
	},

	update:function(id, params, callback) {

		return (function() {
			this.connection._request({
				method: 'PUT',
				endpoint: END_POINT + '/{id}',
				body: params
			}, function(error, body) {
				if (error) {
					callback(error, null)
				}

				return callback(null, body)
			})
		}).bind(this);
	},

	get: function(id, callback) {

		return (function() {
			this.connection._request({
				endpoint: END_POINT + '/{id}'
			}, function(error, body) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, body);
			})
		}).bind(this);
	},

	list: function(params, callback) {
		var pagination;
		if (params == null) {
			params = {}
		}
		pagination = Infinity;
		if ('pagination' in params) {
			pagination = params['pagination'];
		}
		return (function() {
			this.connection._request({
				endpoint:END_POINT,
				qs: _.extend({}, params, {
					perPage: pagination
				})
			}, function(error, bodyArray) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, bodyArray);
			})
		}).bind(this);
	}
}

module.exports = Subscription;
