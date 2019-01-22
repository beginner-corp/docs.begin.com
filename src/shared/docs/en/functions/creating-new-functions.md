## Overview

Begin apps are composed of many (relatively) small, fast cloud functions – and new ones is easy!

Simply [open your app in Begin](https://begin.com) and open the Functions view.

Once there, select the HTTP method for your new route, enter the path for the route you wish to create, then click `Add new route`.

<!-- @todo - expand this section with references to "routes and events" when we add @events and @scheduled -->

All routes begin with `/`, and can include letters, numbers, and slashes, up to 35 characters.

After clicking `Add new route`, the following things happen automatically:
- The new route is saved to your Begin app's configuration
- Infrastructure is provisioned to make the route publicly available
- A basic route handler is committed to your project in the `src/http/` folder
- A build is kicked off, and, if green, is deployed to `staging` (but not `production`)

> ✨ Tip: It's possible to have multiple HTTP methods respond from the same path! For example: `GET /contact-us` and `POST /contact-us` is totally valid.


## Using URL parameters to create dynamic paths

It's possible to build dynamic paths using Express-style URL parameters, like: `GET /shop/:item`
<!-- @todo - add link: learn more about routes with parameters in our project doc(s) -->

URL parameters are passed to your route via the `req.params` object. ([Head here for more information about HTTP requests.](/en/functions/http/#requests))

For example, the route used to serve this page is `GET /:lang/:cat/:doc` ([view source here!](https://github.com/smallwins/docs.begin.com/blob/master/src/http/get-000lang-000cat-000doc/index.js)). When a client requests the path `/en/routes-functions/creating-new-routes/`, the function handling this route receives a `req` object containing:

```js
{
  params: {
    lang: 'en',
    cat: 'functions',
    doc: 'creating-new-routes'
  }
}
```
<!-- @todo - expand this section more -->


## More about routes in Begin

Want to learn a little more about how routes in Begin are born?

As it happens, the AWS infrastructure needed to marshal your app's requests and responses (API Gateway) is separate and different from the cloud compute that runs your code (Lambda).

This architecture is capable of enormous scale, but can be quite complex to manage. Fortunately, this is one of the many things Begin manages for you behind the scenes.

Routes in Begin apps generally consist of the following parts:

- A publicly available URL route (represented by a path and HTTP method) in two separate, fully isolated AWS API Gateways – one for `staging`, one for `production` – that call to...
- Your route handler code, which runs in two separate, fully isolated AWS Lambdas – again, one for `staging`, one for `production` – which support sessions out of the box via...
- Your app's [sessions](/en/functions/sessions/) and [data](/en/functions/sessions/).
