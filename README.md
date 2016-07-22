# paystack-node

> This is a work in progress. The API is incomplete. Do not use this project for anything yet.

A Simple NodeJS wrapper for [Paystack's] (https://paystack.co).

### Features

 - Create, Get, Update and List Customers
 - Initialize, Verify, Get, List, Charge amd Export Transactions
 - Create, Get, Update and List Plans

### Installation

```
 $ npm install paystack-node
```

### Usage

To initialize a paystack connection, First, get your developer Authorization Key from [Paystack] (https://paystack.co), then import the `paystack-node` library with a call to `with(apiKey)`, passing in the given `Authorization Key`.

```js

var Paystack = require('paystack-node');
```

Resources(Customer. Transaction, Plan, Subscription, Page) are accessed via an instance of `Paystack`. And each resource method accepts a callback function as its last argument. The `callback` function returns two JSON objects -- `error` and `body`, as responses from the API call.


Creating a Customer
-----

```js
var paystack = Paystack.with('sk_authorizationKeyFromPaystack');

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

> **TODO:** Implement an example express app using this wrapper library.