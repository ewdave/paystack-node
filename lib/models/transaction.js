(function () {
	var Transaction, _, END_POINT;

	_ = require('underscore');

	END_POINT = '/transaction';

	module.exports = Transaction = (function() {

		function Transaction(connection) {
			this.connection = connection;
			if (!(this.connection instanceof require('../paystack-connection'))) {
				throw new Error("Connection object not provided");
			}
			this;
		}

		Transaction.prototype.initialize = function(params, callback) {
			var params = params || ['reference', 'amount', 'email', 'plan'];
			return this.connection._request({
				method: 'POST',
				endpoint: END_POINT + '/initialize',
				body: params
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
					return callback(error, null);
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
						return callback(error, null);
					}
					
					return callback(null, body);
				}
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
					return callback(error, null);
				}

				return callback(null, body);
			});
		};

		Transaction.prototype.charge = function(params, callback) {
			var params = params || ['reference', 'authorization_code', 'email', 'amount'];

			return this.connection._request({
				method: 'POST',
				endpoint: END_POINT + '/charge_authoriztion',
				body: params
			}, function(error, body) {
				if (error) {
            return callback(error, null);
          }

          return callback(null, body);
			})
		};

		Transaction.prototype.chargeToken = function(params, callback) {
			var params = params || ['reference', 'token', 'email', 'plan'];

			return this.connection._request({
				method: 'POST',
				endpoint: END_POINT + '/charge_token',
				body: params
			}, function(error, body) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, body);
			})
		};

		Transaction.prototype.export = function() {
			var params = params || ['reference', 'token', 'email', 'plan'];
			return this.connection._request({
				method: 'POST',
				endpoint: END_POINT + '/export',
				body: params
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