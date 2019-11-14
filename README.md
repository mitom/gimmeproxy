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
  userID: 'foo', // (optional) if you don't specify one a random one will be generated when you need it.
  timeout: 600,   // (optional) the timeout to pass to every request that does not specify one.
  api_key: 'XXXXXX', // (optional) gimmeproxy API Key
});

// it takes an optional options parameter
gimmeproxy.getProxy({
  timeout: 100, // timeout
  https: true, // supports https
  userAgent: true, // supports user-agent forwarding
  /*
    every GET parameter option the gimmeproxy API offers
  */
}).then(function(proxyData) {
  console.log(proxyData);
});
````

> Although the user id will be generated I suggest to supply it yourself if you actively rely
on the timeouts as the a new id will be generated if your process restarts and you will use your timeouts.