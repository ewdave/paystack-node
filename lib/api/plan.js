'use strict';

var	_ = require('underscore'),
	END_POINT = '/plan';

function Plan() {}

Plan.prototype.create = function(params, callback) {
	params = params || ['name', 'description', 'amount', 'interval', 'send_invoices', 'send_sms', 'hosted_page', 'hosted_page_url', 'hosted_page_summary', 'currency'];
	
	return (function() {
		this._request({
			method: 'POST',
			endpoint: '/plan',
			body: params
	}, function(error, body) {
			if (error) {
				return callback(error, null);
			}

			return callback(null, body);
		}
	)}).bind(this);
};

Plan.prototype.update = function(id, params, callback) {
	params = params || ['name', 'description', 'amount', 'interval', 'send_invoices', 'send_sms', 'hosted_page', 'hosted_page_url', 'hosted_page_summary', 'currency'];

	return (function() {
		this._request({
			method: 'POST',
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

Plan.prototype.get = function(id, callback) {
	
	return (function() {
		this._request({
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

Plan.prototype.list = function(params, callback) {
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
			if (error) {
				return callback(error, null);
			}
			
			return callback(null, bodyArray);
		}
	)}).bind(this);
};

module.exports = Plan;