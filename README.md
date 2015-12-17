# GimmeProxy

This is a simple wrapper for the free [GimmeProxy](http://gimmeproxy.com) api.
It does only 2 things:
 * allows you to set general configuration for timeouts and user-id
 * uses the correct api endpoint depending on the timeout

It will always return a promise that contains the response from the api,
 or throws an error if there is one.

## Usage

````javascript
var gimmeproxy = require('gimmeproxy');

// optional, you don't need to call this at all
gimmeproxy.config({
  userID: 'foo', // if you don't specify one a random one will be generated when you need it.
  timeout: 600   // the timeout to pass to every request that does not specify one.
});

// it takes a single optional parameter, that is the timeout to use.
gimmeproxy.getProxy(100).then(function(proxyData) {
  console.log(proxyData);
});
````

> Although the user id will be generated I suggest to supply it yourself if you actively rely
on the timeouts as the a new id will be generated if your process restarts and you will use your timeouts.



