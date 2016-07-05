(function () {
	var Paystack, request, _, PaystackConnection;

	_ = require('underscore');

	request = require('request');

	PaystackConnection = require('./paystack-connection');

	Paystack = (function() {
		function Paystack() {}

		Paystack.apiKey = null;

		Paystack.apiServer = 'https://api.paystack.co';

		Paystack.config = function(arg) {
			var apiServer, apiKey, ref;
			ref = arg != null ? arg : {}, apiKey = ref.apiKey, apiServer = ref.apiServer;

			if (apiKey){
				this.apiKey = apiKey;
			}
			if (apiServer) {
				this.apiServer = apiServer;
			}
			return this;
		};

		Paystack.hostedAPI = function() {
			return (this.apiKey != null);
		};

		Paystack['with'] = function(key) {
			var hosted;
			if (key == null) {
				throw new Error("This function requires a key");
			}
			return new PaystackConnection(key, hosted = this.hostedAPI);
		};

		return Paystack;

	})();

	module.exports = Paystack;
	
}).call(this);