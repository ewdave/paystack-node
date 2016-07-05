(function () {
	var Subscription, _ END_POINT, PaystackConnection;

	_ = require('underscore');

	END_POINT = '/subscription';

	PaystackConnection = require('../paystack-connection');

	module.exports = Subscription = (function() {

		function Subscription(connection) {
			this.connection = connection;
			if (!(this.connection instanceof PaystackConnection)) {
				throw new Error("Connection object not provided");
			}
			this;
		}

		return Subscription;

	})();
}).call(this);