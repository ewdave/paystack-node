'use strict';

var	_ = require('underscore'),

	END_POINT = '/page';

module.exports = function() {

	function Page(connection) {}
	
	Page.prototype.create = function(params, callback) {
		var params = params || ['name', 'description', 'amount'];

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
		).bind(this);
	};

	Page.prototype.update = function(id, params, callback) {
		var params = params || ['name', 'description', 'amount'];

		amount = utils.validate_amount(amount);
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

	Page.prototype["delete"] = function(id, params, callback) {
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

	Page.prototype.get = function(id, callback) {
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

	Page.prototype.list = function(params, callback) {
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

	return Page;

};