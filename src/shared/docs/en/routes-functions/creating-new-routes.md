## Overview

Creating new routes is super easy!

Simply [open your app in Begin](https://begin.com), and in the left nav find the section of the type of Function you want to create a route for (i.e. `HTML Functions`). Then click its corresponding `Add new Function` button.

All Functions begin with `/`, and can include letters, numbers, and slashes, up to 25 characters.

After clicking `Add Function`, the following things happen automatically:
- The new route is saved to your Begin app's configuration
- Infrastructure is provisioned to make the route publicly available
- A basic Function is committed to your project in the `src/html/` folder
- A build is kicked off, and, if green, is deployed to `staging` (but not `production`)

> ✨ Tip: It's possible to have multiple HTTP methods respond from the same URL path! For example: `GET /contact-us` and `POST /contact-us` is totally valid.


## Using URL parameters to create dynamic paths

It's possible to build dynamic paths using Express-style URL parameters, like: `GET /shop/:item`
<!-- @todo - add link: learn more about routes with parameters in our project doc(s) -->

URL parameters are passed to your Function via the Architect API's `req.params` object.

For example, the route used to serve this page is `GET /:lang/:cat/:doc`. When a client requests the path `/en/routes-functions/creating-new-routes/`, the Function handling this route receives a `req` object containing:

```js
{
  params: {
    lang: 'en',
    cat: 'routes-functions',
    doc: 'creating-new-routes'
  }
}
```
<!-- @todo - expand this section more -->

## More about routes in Begin

Want to learn a little more about how routes in Begin are born?

As it happens, the AWS infrastructure needed to marshal your app's requests and responses (API Gateway) is separate and different from the cloud compute that runs your code (Lambda).

This architecture is capable of enormous scale, but can be quite complex to orchestrate. Fortunately, this is one of the many things Begin manages for you behind the scenes.

Routes in Begin apps generally consist of the following parts:

- A publicly available URL route (represented by a path and HTTP method) in two separate, fully isolated AWS API Gateways – one for `staging`, one for `production` – that call to...
- Your Function code, which runs in two separate, fully isolated AWS Lambdas – again, one for `staging`, one for `production` – which support sessions out of the box via...
- Your app's session and data stores, which are persisted in two separate, fully isolated DynamoDB tables – you guessed it, one for `staging`, one for `production`
