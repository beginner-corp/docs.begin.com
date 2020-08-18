## Overview

In early 2019, Amazon built a new service from the ground up that offers a better solution for building APIs. HTTP APIs enable you to create RESTful APIs with lower latency and lower cost than REST APIs. We quickly implemented this new service into Begin to help speed up your development time and pass lower costs on to you.

**Faster**

For the majority of use cases, HTTP APIs offer up to a 60% reduction in latency. Developers strive to build applications with minimal latency and maximum functionality. 

**Lower costs**

Overall, HTTP APIs are at least 71% lower cost compared to API Gateway REST APIs.

> 🤖 You can read more details about [Amazon launching HTTP APIs here](https://aws.amazon.com/blogs/compute/building-better-apis-http-apis-now-generally-available/).

## Upgrade

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

## Auth using JWT