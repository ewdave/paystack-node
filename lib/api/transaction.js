var _ = require('underscore'),
	END_POINT = '/transaction';

function Transaction(connection) {
	this.connection = connection;
}

Transaction.prototype = {

	initialize: function(params, callback) {
		
		return (function() {
			this.connection._request({
				method: 'POST',
				endpoint: END_POINT,
				body: params
			}, function(error, body) {
					if (error) {
						return callback(error, null);
					}

					return callback(null, body);
				}
			)}
		).bind(this);
	},

	verify: function(params, reference, callback) {
		
		return (function() {
			this.connection._request({
			method: 'POST',
			endpoint: END_POINT + 'verify/{reference}',
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
			this.connection._request({
			method: 'GET',
			endpoint: END_POINT + '/{id}'
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
			this.connection._request({
				method: 'GET',
				endpoint: END_POINT,
				qs: _.extend({}, params, {
					perPage: pagination
			})
		}, function(error, body) {
			if (error) {
				return callback(error, null);
			}

			return callback(null, body);
		})}).bind(this);
	},

	charge: function(params, callback) {

		return (function() {
			this.connection._request({
			method: 'POST',
			endpoint: END_POINT + '/charge_authorization',
			body: params
		}, function(error, body) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, body);
			}
		)}).bind(this);
	},

	chargeToken: function(params, callback) {

		return (function() {
			this.connection._request({
			method: 'POST',
			endpoint: END_POINT + '/charge_token',
			body: params
		}, function(error, body) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, body);
			}
		)}).bind(this);
	},

	export: function(params, callback) {
		
		return (function() {
			this.connection._request({
			method: 'POST',
			endpoint: END_POINT + '/export',
			body: params
		}, function(error, body) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, body);
			}
		)}).bind(this);
	}

} 

module.exports = Transaction;