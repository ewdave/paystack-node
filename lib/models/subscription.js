(function () {
	var Subscription, _ END_POINT;

	_ = require('underscore');

	END_POINT = '/subscription';

	module.exports = Subscription = (function() {

		function Subscription(connection) {
			this.connection = connection;
			if (!(this.connection instanceof require('../paystack-connection'))) {
				throw new Error("Connection object not provided");
			}
			this;
		}

		return Subscription;

	})();
}).call(this);