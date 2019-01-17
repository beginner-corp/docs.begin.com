## Overview

Begin Data is an easy to use, fast, durable, highly scalable, and fully managed key-value and document database that comes bundled with every Begin app.

Begin Data is easy to learn and implement, and is designed to accommodate most general persistence use cases. Let's take a look!


## Tables & keys

Begin Data documents have two mandatory properties:
- `table` - **String** [*required*]
  - Property by which documents are grouped
  - Values may be 1-50 of the following characters: `[a-zA-Z0-9.,:-/+?&=@]`
- `key` - **String**
  - Property by which documents are indexed
  - Values may be 1-50 of the following characters: `[a-zA-Z0-9.,:-/+?&=@]`
  - If not supplied, Begin Data will automatically supply a semi-random, unique, immutable `key`

Optionally, documents may possess a `ttl` property.

Here's a Function performing a quick document read using `table` and `key`:

```js
// src/html/get-*/index.js
let data = require('@begin/data')

exports.handler = async function route(req) {

  table = 'greetings'
  key = 'Japanese'
  let hello = await data.get({table, key})

  res({
    html: `"Hello" in ${key} is: ${hello}!`
  })
}
```

Now let's take a closer look at the Begin Data API.


## Begin Data API

The Begin Data API consists of six methods: `get`, `set`, `destroy`, `incr`, `decr`, and `count`.

Each Begin Data method operates asynchronously, accepting an optional callback and returning a Promise.


### `get`

As you'd imagine, `data.get()` is responsible for getting documents.

`data.get()` can get a single document, batch get multiple documents, or get an entire `table`.

### Syntax

`data.get(params[, callback])`

- `params` - **Object** or **Array** [*required*]
  - [Get a single document](#get-a-single-document)
  - [Get multiple documents](#get-multiple-documents)
  - [Get an entire `table`](#get-an-entire-table)
- `callback` - **Function**

---

### Get a single document

Get a single document by passing an Object containing:
  - `table` - **String** [*required*]
  - `key` - **String** [*required*]

```js
// Basic example of getting a single document
table = 'greetings'
key = 'Japanese'
data.get({table, key})
```

---

### Get multiple documents

Get multiple documents by passing an Array containing:
- One or more Objects, each containing:
  - `table` - **String** [*required*]
  - `key` - **String** [*required*]

```js
// Basic example of getting multiple documents
table = 'greetings'
data.get([
  {table, key: 'Māori'},
  {table, key: 'Swahili'},
  {table, key: 'Japanese'},
])
```

---

### Get an entire `table`

Get an entire `table` by passing an Object containing:
- `table` - **String** [*required*]
- `limit` - **Number**
  - Limit the number of documents to be returned
- `cursor` - **String**
  - If your `table` contains many documents (or a greater number of documents than your `limit`), it will return a cursor

```js
// Basic example of getting an entire table
table = 'greetings'
data.get({table})
```

If your `table` contains many documents, it will paginate and return a `cursor`, on which you can key your next query.


### `data.set()`


### `data.destroy()`


### `data.count()`


### `data.incr()`


### `data.decr()`



## TTL

