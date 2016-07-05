(function () {
	var Transaction, _, END_POINT, PaystackConnection;

	_ = require('underscore');

	END_POINT = '/transaction';

	PaystackConnection = require('../paystack-connection');

	module.exports = Transaction = (function() {

		function Transaction(connection) {
			this.connection = connection;
			if (!(this.connection instanceof PaystackConnection)) {
				throw new Error("Connection object not provided");
			}
			this;
		}

		Transaction.prototype.initialize = function(params, callback) {
			if (params == null) {
				params = {};
			};
			return this.connection._request({
				method: 'POST',
				endpoint: END_POINT + '/initialize',
				body: _.extend({}, params, {
					reference: reference,
					amount: amount,
					email: email,
					plan: plan
				})
			}, function(error, body) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, body);
			});
		};

		Transaction.prototype.verify = function(params, reference, callback) {
			if (params == null) {
				params = {};
			}
			return this.connection._request({
				method: 'GET',
				endpoint: END_POINT + '/verify{reference}'
			}, function(error, body) {
				if (error) {
					return callback(error, null;)
				}

				return callback(null, body);
			});
		};

		Transaction.prototype.get = function(id, callback) {
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

		Transaction.prototype.list = function(params, callback) {
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
			}, function(error, body) {
				if (error) {
					return callback(error, null;)
				}

				return callback(null, body);
			});
		};

		Transaction.prototype.charge = function(params, callback) {
			if (params == null) {
				params = {};
			}
			return this.connection._request({
				method: 'POST',
				endpoint: END_POINT + '/charge_authoriztion',
				body: _.extend({}, params, {
					reference: reference,
					authorization_code: authorization_code,
					email: email,
					amount: amount
				})
			}, function(error, body) {
				if (error) {
            return callback(error, null);
          }

          return callback(null, body);
			})
		};

		Transaction.prototype.chargeToken = function(params, callback) {
			if (params == null) {
				params = {};
			}
			return this.connection._request({
				method: 'POST',
				endpoint: END_POINT + '/charge_token',
				body: _.extend({}, params, {
					reference: reference,
					token: token,
					email: email,
					plan: plan
				})
			}, function(error. body) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, body);
			})
		};

		Transaction.prototype.export = function() {
			if (params == null) {
				params = {};
			}
			return this.connection._request({
				method: 'POST',
				endpoint: END_POINT + '/export',
				body: _.extend({}, params, {
					reference: reference,
					token: token,
					email: email,
					plan: plan
				})
			}, function(error, body) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, body);
			})
		};
		
		return Transaction;

	})();
}).call(this);