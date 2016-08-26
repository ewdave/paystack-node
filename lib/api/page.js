'use strict';

var	_ = require('underscore'),
	END_POINT = '/page';

function Page(connection) {
	this.connection = connection;

	this;
}

Page.prototype = {

	create: function(params, callback) {

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
			)
		}).bind(this);
	},

	update: function(id, params, callback) {

		return (function() {
			this.connection._request({
				method: 'POST',
				endpoint: END_POINT + '/{id}',
				body: params
			}, function(error, body) {
					if (error) {
						return callback(error, null);
					}

					return callback(null, body);
				}
			)
		}).bind(this);
	},

	get: function(id, callback) {
	
		return (function() {
			return this._request({
				method: 'GET',
				endpoint: END_POINT
			}, function(error, body) {
					if (error) {
						return callback(error, null);
					}

					return callback(null, body);
				}
			)
		}).bind(this);
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
			}, function(error, bodyArray) {
					if (error) {
						return callback(error, null);
					}
					
					return callback(null, bodyArray);
				}
			)
		}).bind(this);
	}

}

module.exports = Page;