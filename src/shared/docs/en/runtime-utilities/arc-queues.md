## Overview

`arc.queues` allow you to invoke `@queue` handlers from any other function defined under the same `@app` namespace. 

Queue functions are special Lambda functions that enable a message queue using [AWS SQS](https://aws.amazon.com/sqs/). Architect has helpful methods for working with JSON payloads, service discovery, and make responses compatible with Lambda function signatures.

Functions defined by `@queue` in the `app.arc` file correspond to an SQS queue and a Lambda function handler. There are two methods you can use: 

- `publish()`  
- `subscribe()`

A queue function will poll for messages on the queue when it is invoked. 

## Install

### Install runtime helpers for Node

```bash
cd path/to/lambda
npm init -f
npm install @architect/functions
```

### Install runtime helpers for Ruby

```bash
cd path/to/lambda
bundle init
bundle install --path vendor/bundle
bundle add architect-functions
```

### Install runtime helpers for Python

```bash
cd path/to/lambda
pip install --target ./vendor architect-functions
```

To use our runtime helpers inside of a module in your project, simply require as shown below.

```js
let arc = require('@architect/functions')
```

## Usage

### Publish

`arc.queues.publish(params, callback)`

Publishes `params.payload` to the SQS Queue (queue) with name `params.name`. The `params.name` parameter should match the queue defined under `@queues`. 

This allows you to publish to queues from any function within your application (`@app` `app.arc` file namespace) to be handled by the queue handler.

When running in local/testing mode, will publish the event to the sandbox.


### Subscribe

`arc.queues.subscribe(params, callback)`

Used to define a lambda function that will act as a queue handler. Queue handlers are defined in your application's `app.arc` file under the `@queues` pragma. The function code for the accompanying handler to each queued item should use `arc.queues.subscribe` to wrap the handler. 

For example, given the following `app.arc` file snippet:

```bash
@queues
concert-tickets
```

... the following file will be initialized representing the event handler for the concert-tickets queue, wherein you need to use `arc.queues.subscribe`:

```js
// file: src/queues/concert-tickets/index.js

let arc = require('@architect/functions')
module.exports = arc.queues.subscribe(function(payload, callback) {
  console.log(payload)
  callback()
})
```

## Example


### Publish a JSON payload to an SQS Queue URL

Node

```javascript
let arc = require('@achitect/functions')

await arc.queues.publish({
  name: 'avatar-resizer',
  payload: {name: 'punky.jpg'},
})
```

Ruby

```ruby
require 'architect/functions'

Arc::Queues.publish name: 'avatar-resizer', payload: {name: 'zack.png'}
```

Python

```python
import arc.events

arc.queues.publish(name='avatar-resizer', payload={'name': 'rusty.gif'})
```

---
