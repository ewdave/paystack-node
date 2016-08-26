var _ = require('underscore');

	module.exports = {
		validate_amount : function(amount) {
			var amount;
			if (!amount) {
				throw new Error("Amount to be charged is required")
			}
			var err = new TypeError("Amount should be a number");
			amount = _.isFinite(amount) ? amount : err;
			return amount;
		},
		
		validate_interval : function(interval) {
			var interval;
			var validIntervals = ['hour', 'daily', 'weekly', 'monthly', 'annually'];
			interval = interval in validIntervals ? interval : '';

			if (!interval) {
				throw new Error("Invalid interval, Please provide a valid interval")
			}
			return interval;
		}
	}