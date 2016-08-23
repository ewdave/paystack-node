var	_ = require('underscore'),
	END_POINT = '/subscription';

function Subscription(connection) {
	this.connection = connection;
	if (!(this.connection instanceof require('../paystack-connection'))) {
		throw new Error("Connection object not provided");
	}
	this;
}

Subscription.prototype ={

	create: function(params, callback) {
		params = params;

		return (function() {
			this.connection._request({
				method: 'POST',
				endpoint: END_POINT,
				body: params
			}, function(error, body) {
				if (error) {
					return callback(error, null)
				}

				return callback(null, body)
			})
		}).bind(this)
	},

	update:function(id, params, callback) {


		return (function() {
			this.connection._request({
				method: 'PUT',
				endpoint: END_POINT + '/{id}',
				body: params
			}, function(error, body) {
				if (error) {
					callback(error, null)
				}

				return callback(null, body)
			})
		}).bind(this);
	},

	get: function(id, callback) {

		return (function() {
			this.connection._request({
				endpoint: END_POINT + '/{id}'
			}, function(error, body) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, body);
			})
		}).bind(this);
	},

	list: function(params, callback) {
		var pagination;
		if (params == null) {
			params = {}
		}
		pagination = Infinity;
		if ('pagination' in params) {
			pagination = params['pagination'];
		}
		return (function() {
			this.connection._request({
				endpoint:END_POINT,
				qs: _.extend({}, params, {
					perPage: pagination
				})
			}, function(error, bodyArray) {
				if (error) {
					return callback(error, null);
				}

				return callback(null, bodyArray);
			})
		}).bind(this);
	}
}

module.exports = Subscription;

Good day,

Thanks again for taking the time to speak with me about the software developer position with Tivas Group 

It really was a pleasure meeting and interacting with you. I did enjoy learning more about the role, company and all. After our conversation, I am confident that my skills, experience, mindset, outlook, attitude and willingness to learn and grow with the team are a great match for this opportunity.

I am very much enthuiastic about the possibility of joining your team and I greatly appreciate this follow-up mail concerning the hiring process. 

In need of any further information, please do contact me by email or phone. Thanks again.

...
Wale Eseyin
U: www.github.com/ewdave | Skype: mindful16
T: +234 706 267 0637