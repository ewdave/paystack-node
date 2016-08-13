var _ = require('underscore'),
	END_POINT = '/transaction';

function Transaction(connection) {
	this.connection = connection;
	if (!(this.connection instanceof require('../paystack-connection'))) {
		throw new Error("Connection object not provided");
	}
	this;
}

Transaction.prototype.initialize = function(params, callback) {
	var params = params || ['reference', 'amount', 'email', 'plan'];
	
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
};

Transaction.prototype.verify = function(params, reference, callback) {
	if (params == null) {
		params = {};
	}
	
	return (function() {
		return this._request({
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
};

Transaction.prototype.get = function(id, callback) {
	
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
};

Transaction.prototype.list = function(params, callback) {
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
	}, function(error, body) {
		if (error) {
			return callback(error, null);
		}

		return callback(null, body);
	})}).bind(this);
	
};

Transaction.prototype.charge = function(params, callback) {
	var params = params || ['reference', 'authorization_code', 'email', 'amount'];

	return (function() {
		return this._request({
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
};

Transaction.prototype.chargeToken = function(params, callback) {
	var params = params || ['reference', 'token', 'email', 'plan'];

	return (function() {
		return this._request({
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
};

Transaction.prototype.export = function() {
	var params = params || ['reference', 'token', 'email', 'plan'];
	
	return (function() {
		return this._request({
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
};

module.exports = Transaction;