# paystack-node

A Simple NodeJS wrapper for [Paystack's] (https://paystack.co).

### Features

 - Create, Get, Update and List Customers
 - Initialize, Verify, Get, List, Charge amd Export Transactions
 - Create, Get, Update and List Plans

### Installation

```
npm install paystack-node
```

### Usage

First, get your developer Authorization key from [Paystack] (https://paystack.co). Then require the `paystack-node` library with a call to `config` to initialize a paystack connection with your given `authorization-key`.

```js

var Paystack = require('paystack-node').config({
	apiKey: 'sk_authorizationKeyFromPaystack'
});
```

Resources(Customer. Transaction, Plan, Subscription, Page) are accessed via an instance of `Paystack`. And each resource method accepts a callback function as its last argument. The `callback` function returns two JSON objects -- `error` and `body`, as responses from the API call.


Creating a Customer
-----

```js
var paystack = Paystack.with(apiKey);

paystack.customer.create({
	"email": "bojack@horsinaround.com"
},function(err, customer) {
	console.log(customer.message);
	console.log(customer);
});

```

Fetching a Resource
-----

You can pass the ID(required) as a string to the resource method
```js
var paystack = Paystack.with(apiKey);

// GET plan
paystack.plan.get(1173, function(err, plan) {
	console.log(plan.message);
	console.log(plan);
});

// GET -- Listing plans
// You can simply pass a number as pagination 
paystack.plan.list({"pagination": 10}, function(err, plan) {
	console.log(plan.message);
	console.log(plan);
});
```

Initializing and Verifying a Transaction
-----

```js
var paystack = Paystack.with(apiKey);

paystack.transaction.initialize({
	"reference": "Di9vX8MEk85usKEpVDtD",
	"amount": 1,000,000,
	"email": "bojack@horsinaround.com",
	"plan": null
}, function(err, body) {
	console.log(body);
});

paystack.transaction.verify(Di9vX8MEk85usKEpVDtD, function(err, body) {
	console.log(body);
});
```