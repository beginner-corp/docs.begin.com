## Overview

Begin Data is an easy to use, fast, durable, highly scalable, fully managed, SSD-based key-value and document database that comes bundled with every Begin app.

Begin Data is easy to learn and simple to implement, and is designed to accommodate most general persistence use cases.

Here's a simple example of an HTTP Function using Begin Data:

```js
let data = require('@begin/data')
let begin = require('@architect/functions') // Reads & writes session data

exports.handler = async function http(request) {
  let session = await begin.http.session.read(request)
  let account = await data.get({
    table: 'accounts',
    key: session.accountID
  })
  return {
    type: 'text/html; charset=utf8',
    body: `Hello ${account.name}!`
  }
}
```


## Tables & keys

Begin Data documents have two mandatory properties:
- `table` - **String** *(required)*
  - Property by which documents are grouped
  - Values may be 1-50 of the following characters: `[a-zA-Z0-9.,:-/+?&=@]`
- `key` - **String**
  - Property by which documents are indexed
  - Values may be 1-50 of the following characters: `[a-zA-Z0-9.,:-/+?&=@]`
  - If not supplied, Begin Data will automatically supply a pseudo-random, unique, immutable `key`

Optionally, documents may possess [`ttl` property](#ttl).

Here's a Function performing a quick document read using `table` and `key`:

```js
// src/html/get-*/index.js
let data = require('@begin/data')

exports.handler = async function route(req) {

  let table = 'greetings'
  let key = 'Japanese'
  let hello = await data.get({table, key})

  return {
    type: 'text/html; charset=utf8',
    body: `"Hello" in ${key} is: ${hello}!`
  }
}
```

Now let's take a closer look at the Begin Data API.


## Begin Data API

The Begin Data API consists of three primary methods: [`get`](#dataget), [`set`](#dataset), and [`destroy`](#datadestroy); and three helper methods: [`incr`](#dataincr--datadecr), [`decr`](#dataincr--datadecr), and [`count`](#datacount).

Each Begin Data method operates asynchronously, accepting an optional callback or returning a Promise.


## Read documents

### `data.get()`

As you'd imagine, `data.get()` is responsible for getting documents.

`data.get()` can get a single document, batch get multiple documents, or get an entire `table`.

### Syntax

`data.get(params[, callback])` &rarr; `[Promise]`

- `params` - **Object** or **Array** *(required)*
  - [Get a single document](#get-a-single-document)
  - [Get multiple documents](#get-multiple-documents)
  - [Get an entire `table`](#get-an-entire-table)
- `callback` - **Function**

---

### Get a single document

Get a single document by passing an object containing:
- `table` - **String** *(required)*
- `key` - **String** *(required)*

```js
// Basic example of getting a single document
let table = 'greetings'
let key = 'Japanese'
let doc = await data.get({table, key})
```

---

### Get multiple documents

Get multiple documents by passing an array containing:
- One or more objects, each containing:
  - `table` - **String** *(required)*
  - `key` - **String** *(required)*

```js
// Basic example of getting multiple documents
let table = 'greetings'
let greetings = await data.get([
  {table, key: 'Māori'},
  {table, key: 'Swahili'},
  {table, key: 'Japanese'},
])
```

---

### Get an entire `table`

Get an entire `table` by passing an object containing:
- `table` - **String** *(required)*
- `limit` - **Number**
  - Limit the number of documents to be returned
- `cursor` - **String**
  - If your `table` contains many documents (or a greater number of documents than your `limit`), it will return a cursor

```js
// Basic example of getting an entire table
let table = await data.get({table:'greetings'})
```

If your `table` contains many documents, it will paginate and return a `cursor` for use in your next query. For example:

```js
let table = 'greetings'
let result = await data.get({table, limit: 3}) // Returns:
// [{ table, key: 'Māori', greeting: 'Kia ora' },
//  { table, key: 'Swahili', greeting: 'Hujambo' },
//  { table, key: 'Japanese', greeting: 'Kon'nichiwa' },
//  cursor: 'eyJziJzY29wZUlELCJkYX9jYWwidW50RhSUQiOdGFnaW5nI21vIjoibGYWlucyNsa3JMV21PVWsifQ==']
```


## Create & update documents

### `data.set()`

`data.set()` is responsible for creating new documents, and updating existing ones.

`data.set()` can operate on a single document, or batch up to 25 documents.

A single `data.set()` request cannot exceed 10KB.

Your supplied data can be any quantity of the following supported types:
- **Number**
- **String**
- **Binary**
  - Must be base64 encoded
- **Boolean**
- **Null**
- **Array**
- **Object**

### Syntax

`data.set(params[, callback])` &rarr; `[Promise]`

- `params` - **Object** or **Array** *(required)*
  - [Set a single document](#set-a-single-document)
  - [Set multiple documents](#set-multiple-documents)
- `callback` - **Function**

---

### Set a single document

Set a single document by passing an object containing:
- `table` - **String** *(required)*
- `key` - **String**
  - If no `key` is supplied, Begin Data will automatically supply a pseudo-random, unique, immutable `key`
- Your data

```js
// Basic example of getting a single document
let table = 'greetings'
let key = 'Japanese'
let greeting = `Kon'nichiwa`
await data.set({table, key, greeting})
```

---

### Set multiple documents

Set one or more documents by passing an Array containing:
- One or more objects, each containing:
  - `table` - **String** *(required)*
  - `key` - **String**
    - If no `key` is supplied, Begin Data will automatically supply a pseudo-random, unique, immutable `key`
  - Your data

```js
let table = 'greetings'
let greetings = [
  { table, key: 'Māori', greeting: 'Kia ora' },
  { table, key: 'Swahili', greeting: 'Hujambo' },
  { table, key: 'Japanese', greeting: `Kon'nichiwa` } ]
await data.set(greetings)
```


## Destroy documents

### `data.destroy()`

`data.destroy()` is responsible for destroying documents.

Valid `data.destroy()` calls require passing a one or more objects containing a `table` and `key`; there is no limit to the number of documents a single call can destroy.

### Syntax

`data.destroy(params[, callback])` &rarr; `[Promise]`

- `params` - **Object** or **Array** *(required)*
  - [Destroy a single document](#destroy-a-single-document)
  - [Destroy multiple documents](#destroy-multiple-documents)
- `callback` - **Function**

---

### Destroy a single document

Destroy a single document by passing an object containing:
- `table` - **String** *(required)*
- `key` - **String** *(required)*

```js
let table = 'bad vibes'
let key = 'Negativity'
await data.destroy({table, key})
```

---

### Destroy multiple documents

Destroy one or more documents by passing an Array containing
- One or more objects, each containing:
  - `table` - **String** *(required)*
  - `key` - **String** *(required)*

```js
let table = 'bad vibes'
await data.destroy([
  { table, key: 'Pessimism' },
  { table, key: 'Anxiety' }
])
```


## Helpers

Begin Data also surfaces a few handy helpers to make other common operations a bit easier, such as [counting rows](#datacount), and [incrementing & decrementing Numbers](#dataincr--datadecr).

### `data.count()`

`data.count()` returns the count of a `table`'s documents.

### Syntax

`data.count(params[, callback])` &rarr; `[Promise]`

- `params` - **Object** *(required)*
  - `table` - **String** *(required)*
- `callback` - **Function**

An example:

```js
let table = 'greetings'
await data.count({table}) // Returns: 42
```


### `data.incr()` & `data.decr()`

### Syntax

`data.incr(params[, callback])` &rarr; `[Promise]`

`data.decr(params[, callback])` &rarr; `[Promise]`

- `params` - **Object** *(required)*
  - `table` - **String** *(required)*
  - `key` - **String** *(required)*
  - Property to increment or decrement, must be a number *(required)*
- `callback` - **Function**

Examples:

```js
let table = 'rain'
let key = `Wai'ale'ale`
let averageInches = 450

// Increment
await data.incr({table, key, averageInches})
// Returns: { averageInches: 451 }

// Decrement
await data.decr({table, key, averageInches})
// Returns: { averageInches: 450 }
```


## TTL

Any document can be automatically expunged by setting a `ttl` value.

`ttl` is a Number corresponding to a specific future Unix epoch (expressed in seconds).

Documents will typically be automatically destroyed within 48 hours of the `ttl` expiring.

Tip: during the intervening time between `ttl` expiry and actual expunging, the document will still be available; if its `ttl` is mutated or unset, the document's new `ttl` state will be respected.

```js
let table = 'mandalas'
let key = 'Tibetan'
let ttl = (Date.now() / 1000) + (60 * 60 * 24 * 7) // One week from now in seconds
await data.set({table, key, ttl})
```


## Limits

- `data.set()` has a maximum batch size of 25 documents and 10KB per call.
- Empty attributes are invalid and will produce errors. For example:
```js
let table = 'accounts'
let key = 'dW50RhSUQiOdG'
let email = '' // Invalid
await data.set({table, key, email})
```
