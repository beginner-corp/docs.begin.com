## Overview

Event functions are special Lambda functions that enable a pub/sub message bus using [AWS SNS](https://aws.amazon.com/sns/). Architect has helpful methods for working with JSON payloads, service discovery, and make responses compatible with Lambda function signatures.

Functions defined by `@event` in the `app.arc` file correspond to an SNS topic and a Lambda function handler. 

There are two methods you can use: 

- `publish()`  
- `subscribe()`

A common pattern is creating a POST endpoint with an HTTP function that publishes JSON to the event function. This allows for events to be captured from the client that can branch separate asynchronous tasks. 

For example: 

- signing up for a newsletter  
- saving telemetry data.

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

To use our runtime helpers inside of a module in your node environment, simply require as shown below.

```js
let arc = require('@architect/functions')
```

## Usage

### `arc.events.subscribe(fn)`

This helper method is for subscribing a function to an event. If no callback is provided, it will return a promise.  

The function code for the accompanying handler to each event should use `arc.events.subscribe` to wrap the handler. 

For example, given the following project manifest snippet:

```bash
@events
concerts
```

... the following file will be initialized representing the event handler for the `concerts` event, wherein you need to use `arc.events.subscribe`:

```js
// file: src/events/concerts/index.js

let arc = require('@architect/functions')
module.exports = arc.events.subscribe(function(payload, callback) {
  console.log(payload)
  callback()
})
```


### `arc.events.publish(params, callback)`

This helper publishes `params.payload` to the SNS Topic (event) with name `params.name`. The `params.name` parameter should match the event defined under `@events`. 

This allows you to publish events from any function within your application (`@app` `app.arc` file namespace) to be handled by the event handler.

You can publish a JSON payload to an `@event` function with a name and payload. If no callback is provided, it will return a promise.

```js
// src/http/post-event 
// example publish method

let arc = require('@architect/functions')

await arc.events.publish({
  name: 'event-name',
  payload: { "json": "payload"}
})
```

> When running in local/testing mode, will publish the event to the `sandbox`.

## Example

### Publish JSON payload to an SNS Topic

Node

```js
let arc = require('@achitect/functions')

await arc.events.publish({
  name: 'hit-counter',
  payload: {hits: 1},
})
```

Ruby

```Ruby
require 'architect/functions'

Arc::Events.publish name: 'hit-counter', payload: {hits: 1}
```

Python

```Python
import arc.events

arc.events.publish(name='hit-counter', payload={'hits': 1})
```
