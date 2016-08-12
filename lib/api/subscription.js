var	_ = require('underscore');

	END_POINT = '/subscription';

	module.exports = function() {

		function Subscription(connection) {
			this.connection = connection;
			if (!(this.connection instanceof require('../paystack-connection'))) {
				throw new Error("Connection object not provided");
			}
			this;
		}

		return Subscription;

	};