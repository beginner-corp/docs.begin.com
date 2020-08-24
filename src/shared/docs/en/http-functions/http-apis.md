## Overview

In early 2019, Amazon built a new service from the ground up that offers a better solution for building APIs. HTTP APIs enable you to create RESTful APIs with lower latency and lower cost than REST APIs. We quickly implemented this new service into Begin to help speed up your development time and pass lower costs on to you. HTTP APIs offers a better solution for building APIs. 

### Faster

For the majority of use cases, HTTP APIs offer up to a 60% reduction in latency. Developers strive to build applications with minimal latency and maximum functionality. 

### Lower costs

Overall, HTTP APIs are at least 71% lower cost compared to API Gateway REST APIs.

> 🤖 You can read more details about [Amazon launching HTTP APIs here](https://aws.amazon.com/blogs/compute/building-better-apis-http-apis-now-generally-available/).

## Features

HTTP APIs come packed with powerful features like:

- **JWT authorizers**
  - This is a new authorization type that supports native OpenID Connect (OIDC) authorization. You can configure API Gateway to parse incoming JWT tokens, and allow or deny requests based on the OAuth scopes in the token. With REST APIs, you must use a Lambda custom authorizer to parse the incoming JWT token.
- **Auto-deploying stages**
  - Automatic deployments. You can now optionally enable Auto deploy when you change a stage. By default, you must deploy the API to a stage for changes to go live. This option lets you release changes to your API immediately as the changes are made
- **Simplified route integrations**
  - Default Stages and Routes make it easier to work with APIs. When you assign a default stage, you are able to serve your API from the base URL. For example: https://{api_id}.execute-api.{region}.amazonaws.com/. This means you no longer need an explicit stage in your API. 
- **Private integrations**
  - HTTP APIs now offers developers the ability to integrate with resources secured in a Amazon VPC.
- **Custom domain cross compatibility**
  - Amazon API Gateway now offers the ability to share custom domains across REST APIs and HTTP API. This flexibility allows developers to mix and match between REST APIs and HTTP APIs while building applications.
- **Request throttling**
  - HTTP APIs now offers the ability to do granular throttling at the stage and route level. API throttling is an often-overlooked API feature that is critical to the health of APIs and their infrastructure.
- **Fully customizable CORS experience**
  - Cross-Origin Resource Sharing allows a browser to execute JavaScript across different domains or origins by sending a pre-flight options request to API Gateway.

## Differences between HTTP APIs and REST APIs

HTTP APIs have simplified integrations and event payloads meaning a better development experience. HTTP APIs are designed for low-latency, cost-effective AWS Lambda proxy and HTTP proxy APIs. HTTP APIs support OIDC and OAuth 2.0 authorization, which is a new way to do auth within your apps. HTTP APIs come with built-in support for CORS and automatic deployments as well. 

Previous-generation REST APIs currently offer more features, and full control over API requests and responses so if your use case requires more features then you will be better off continuing the use of REST APIs.

Your existing apps using legacy REST APIs will continue working as normal. New apps created will be provisioned as HTTP APIs.

> [Click here to learn more about the differences between HTTP APIs and REST APIs.](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html)

## How do HTTP APIs integrate with other AWS services?

Your main use case when working with HTTP APIs will be [working with AWS Lambda proxy integrations for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html#http-api-develop-integrations-lambda.response)

A Lambda proxy integration enables you to integrate an API route with a Lambda function. When a client calls your API, API Gateway sends the request to the Lambda function and returns the function's response to the client.

Users can now create Amazon API Gateway HTTP APIs that route requests to:

- AWS AppConfig
- Amazon EventBridge
- Amazon Kinesis Data Streams
- Amazon SQS
- AWS Step Functions 

With these new integrations, customers can easily create APIs and webhooks for their business logic hosted in these AWS services.

## Upgrade

One change is the response from a Lambda function will need to include `statusCode` where it was not required with REST APIs.

Some of your old Begin projects may break because of the newly reformatted payload in your functions. This can easily be solved by adding a success status code to the return statement in your function.

```js
// src/http/get-api/index.js

 exports.handler = async function http (req) {
  console.log('Begin API called')
  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    statusCode: 200,    // Add success status code
    body: JSON.stringify({
      message: 'Hello from your Begin API!'
    })
  }
}
```

