(function () {
	var Page, _, utils, END_POINT, PaystackConnection;

	_ = require('underscore');

	utils = require('../utils');

	END_POINT = '/page';

	PaystackConnection = require('../paystack-connection');

	module.exports = Page = (function() {

		function Page(connection) {
			this.connection = connection;
			if (!(this.connection instanceof PaystackConnection)) {
				throw new Error("Connection object not provided");
			}
			this;
		}
		
		Page.prototype.create = function(params, callback) {
			if (params == null) {
				params = {};
			}
			amount = utils.validate_amount(amount);
			return this.connection._request({
				method: 'POST',
				endpoint: END_POINT,
				body: _.extend({}, params, {
					name: name,
					description: description,
					amount: amount,
				})
			}, function(error, body) {
					if (error) {
						return callback(error, null);
					}

					return callback(null, body);
				}
			);
		};

		Page.prototype.update = function(id, params, callback) {
			if (params == null) {
				params = {}
			}
			amount = utils.validate_amount(amount);
			return this.connection._request({
				method: 'PUT',
				endpoint: END_POINT + '/{id}',
				body: _.extend({}, params, {
					name: name,
					description: description,
					amount: amount,
					active: active
				})
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
				};
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

	})();
}).call(this);