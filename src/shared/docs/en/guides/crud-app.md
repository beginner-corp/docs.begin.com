> ⏱ This tutorial is an introductory walkthrough using Begin Data as your application's database. It should take less than 10 minutes.

## Introduction

[Begin Data](/en/data/begin-data/) is an easy to use, fast, durable, highly scalable, fully managed, SSD-based key-value and document database built on top of [AWS DynamoDB](#learn-more-about-dynamodb). And access to it is available for every Begin app!

You can think of Begin Data as syntactic sugar for making DynamoDB easier to work with. Designed to accommodate most general persistence use cases, its core API has three simple methods: `get`, `set`, and `destroy`.

In this tutorial, we'll show you how to setup and start using Begin Data with a simple todo CRUD app.

## Prerequisites

You will need to have **git** and **Node.js** installed to your local computer to follow along with this tutorial. (Learn more about [installing git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [installing Node.js](https://nodejs.org/en/download/).)

You'll also need a GitHub account. (Learn more about [signing up with GitHub](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github).)

This tutorial also assumes some familiarity with such things as:
- Text editors
- Terminal / CLI
- Git and version control
- General software development using JavaScript

You do not need to be an expert in any of these things in order to follow along and make your first database-enabled app in Begin!

---

## Getting started

First, click the **Deploy to Begin** button below. This starts the process of authorizing Begin with your GitHub account. (You may be prompted to log into GitHub, and/or be asked to create a Begin username.)

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-crud)

### Name your app & repo

You'll then be prompted to name your new app and repository – this is optional, feel free to use the default app and repo name if you like!

> Note: your Begin app name and repository name cannot be changed later.

![Name your Begin app and repo](/_static/screens/shared/begin-repo-name.jpg)

Once you've clicked the `Create...` button, Begin will spin up your new project on GitHub (under `github.com/{your GH username}/{your repo name}`).

> By default your Begin app repo is created as a public GitHub repo; it can be set to private by granting Begin additional permissions from this screen (or later from the `Settings` screen found in the left nav of your Begin app).

---

## Your first deploy

After creating your app, you'll be taken to its `Activity` stream. Welcome to the main backend interface of your Begin app!

![Begin Activity view](/_static/screens/shared/begin-activity.jpg)

From the `Activity` view, you'll be able to watch your app build & deploy in real-time. Any time you push to `master`, you'll see a new build get kicked off in Begin.

Each build undergoes a number of predefined build steps (learn more about [build steps here](/en/getting-started/builds-deploys#configuring-build-steps)); these build steps may install your app's dependencies (`install`), test your code's syntax (`lint`), generate any files or assets needed to run your app (`build`), and/or run an automated test suite (`test`).

If no build steps fail, then the build containing your latest commit to `master` is automatically deployed to your `staging` environment.

Go ahead and click the **Staging** link in the upper left corner of your left nav to open your new app's `staging` URL. You should now see your new app:

![CRUD Starter](/_static/screens/shared/begin-crud.jpg)

> 💡 **Learn more!** Head here to dig deeper into [covers build pipelines, git tagging, and more](/en/getting-started/builds-deploys).

---

## Get set up locally

Next let's get your new site running in your local environment (i.e. the computer you work on).

First, head to your GitHub repo (from the first card in your `Activity`, or from the left nav). Find the clone or download button and copy the git URL.

Then head to your terminal and clone your repo to your local filesystem.

```bash
git clone https://github.com/your-github-username/your-new-begin-app.git
```

Once you've got your project cloned on your local machine, `cd` into the project directory and install your dependencies:

```bash
cd your-new-begin-app
npm install
```
---

## Project structure

Now that your app is live on staging and running locally, let's take a quick look into how the project itself is structured so you'll know your way around. Here are the key folders and files in the source tree of your new todo app:

```bash
.
├── public/
└── src/
    └── http/
         ├── get-todos/
         ├── post-todos/
         └── post-todos-delete/
```

Let's go over each of these directories and how you may use them:

### `public/`

The `public` directory is where we host our home page: `index.html`. This is also where our app's CSS styles and JavaScript live. Here, we'll fetch our todos from our HTTP functions and append them to elements in the DOM while manipulating the state of our app.

### `src/http/get-todos/`

The `GET /todos` function allows you to read the current `todos` from your Begin Data `todos` table; these items are created by way of the HTML form on the home page.

```js
// `src/http/get-todos/index.js`

let data = require('@begin/data')

exports.handler = async function todos (req) {
  let todos = await data.get({
    table: 'todos'
  })
  // Return oldest todo first
  todos.sort((a, b) => a.created > b.created)
  return {
    statusCode: 201,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify({
      todos
    })
  }
}
```

### `src/http/post-todos/`

The `POST /todos` function creates or updates todos in your Begin Data `todos` table when input is posted from your app's HTML form.

```js
// `src/http/post-todos/index.js`

let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function post (req) {
  let todo = arc.http.helpers.bodyParser(req) // Base64 decodes + parses body
  todo.created = todo.created || Date.now()
  todo.completed = !!todo.completed
  await data.set({
    table: 'todos',
    ...todo
  })
  return {
    statusCode: 302,
    headers: {
      'location': '/',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
  }
}
```

### `src/http/post-todos-delete/`

The `POST /todos/delete` function deletes any of the todos from your Begin Data `todos` table.

```js
// `src/http/post-todos-delete/index.js`

let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function destroy (req) {
  let key = arc.http.helpers.bodyParser(req).key // Base64 decodes + parses body
  await data.destroy({
    table: 'todos',
    key
  })
  return {
    statusCode: 302,
    headers: {
      'location': '/',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
  }
}
```

---

## Add Begin Data

First things first. We must always require Begin Data at the top of our functions. The `arc` variable here is used for parsing request bodies in our functions. Follow the link to learn more about [parsing request bodies](https://arc.codes/primitives/http#parsing-request-bodies).

```js
let arc = require('@architect/functions')
let data = require('@begin/data')
```

### Begin Data API

**The core Begin Data API is three methods:**

- `data.get(params[, callback])` &rarr; `[Promise]` for retrieving data
- `data.set(params[, callback])` &rarr; `[Promise]` for writing data
- `data.destroy(params[, callback])` &rarr; `[Promise]` for removing data

**Some additional helper methods are also available:**

- `data.incr(params[, callback])` &rarr; `[Promise]` increment an attribute on an item
- `data.decr(params[, callback])` &rarr; `[Promise]` decrement an attribute on an item
- `data.count(params[, callback])` &rarr; `[Promise]` get the number of items for a given table

All methods accept an object and, optionally, a Node-style errback. If no errback is supplied, a Promise is returned (thus, all methods support async / await).

### Writes

Let's start by saving a single item to a table with the `set` method. We identify the table with the `table` parameter, and can optionally specify a `key`:

```js
let taco = await data.set({
  table: 'tacos',
  key: 'al-pastor'
})
```

Since all items have a `key`, if no `key` is specified, a unique key will automatically be generated:

```js
let token = await data.set({
  table: 'tokens',
})
// { table: 'tokens', key: 'LCJkYX9jYWwidW50RhSU' }
```

We can also batch save multiple items to multiple `table`s by passing `set` an array of objects:

```js
let collection = await data.set([
  { table: 'ppl', name:'grace', email:'ghopper@navy.mil' },
  { table: 'ppl', name:'sutr0', email:'sutr0@harbl.net' },
  { table: 'tacos', key:'pollo' },
  { table: 'tacos', key:'carnitas' }
])
```

### Reads

Read an item by key with the `get` method:

```js
let yum = await data.get({
  table: 'tacos',
  key: 'baja'
})
```

As with `set`, `get` can also batch-read by passing it an array of objects. With these building blocks you can construct secondary indexes and joins, like one-to-many and many-to-many!

```js
await data.get([
  { table: 'tacos', key: 'carnitas' },
  { table: 'tacos', key: 'al-pastor' }
])
```

### Destroy

Delete an item by key with the `destroy` method:

```js
await data.destroy({
  table: 'tacos',
  key: 'pollo'
})
```

Yep, you guessed it: you can also  batch-read delete items by passing `destroy` an array of objects.

```js
await data.destroy([
  { table: 'tacos', key: 'carnitas' },
  { table: 'tacos', key: 'al-pastor' }
])
```

## Begin Data in action

So how do all of these HTTP functions come together to compose the core functionality of the app? This happens inside `public/index.html`. In your index file, the `<script>` contains the code doing the heavy client-side lifting. Now let's take a look a bit closer at what's going on there.

First, we fetch all the todos that currently reside on in the database. To ensure that that this fetch call always runs when the page is loaded, our business logic is immediately invoked:

```js
// Get all todos
function init () {
  fetch('/todos', {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res)
  .then(body => body.json())
  // Call update with fetched todos
  .then(json => update(json.todos))
}

// Kick off the app
init()
```

Now we'll define a set of variables (see: `document.getElementById` calls) that will append the correct state and data in our DOM (see: `innerHTML` calls):

```js
// Update the DOM with data
function update(todos) {
  let list = document.getElementById('js-todos')
  let completed = document.getElementById('js-completed')
  let message = document.getElementById('js-message')
  let current = todos.filter(t => !t.completed)
  let complete = todos.filter(t => t.completed)
  let doneTitle = document.getElementById('js-done-title')
  let done = complete.length && !current.length
  let none = !complete.length && !current.length
  if (none) {
    message.innerHTML = Message({
      src: '/_static/rocket.svg',
      text: 'Let\'s get started!',
      alt: 'Rocket'
    })
  } else if (done) {
    message.innerHTML = Message({
      src: '/_static/astronaut.svg',
      text: 'You did it!',
      alt: 'Astronaut'
    })
  }

  if (complete.length) {
    doneTitle.classList.toggle('display-none')
  }

  list && current.length
    ? list.innerHTML = current.map(t => Todo(t)).join('')
    : ''

  completed && complete.length
    ? completed.innerHTML = complete.map(t => Todo(t)).join('')
    : ''
}
```

---

## Deploy your site

While not required, it's always a good idea to lint and run tests before pushing just to make sure you catch any errors:

```bash
npm run lint
npm t
```

Everything set? Now let's push this commit (and deploy the build to `staging`):

```bash
git add -A
git commit -am 'Just customizing my Begin site!'
git push origin master
```

Head on back to Begin and open your `staging` URL once your build is complete. Looking good? Excellent!

Now let's deploy to `production`: click the **Deploy to production** button in the upper left, pick a version, leave an optional message summarizing your changes, and **Ship it**!

When your next build is done, click the `production` link in the upper left corner to see the latest release of your app.

> **✨Tip:** You can also deploy to production from your terminal by bumping your [npm version](https://docs.npmjs.com/cli/version) (`npm version [patch|minor|major] && git push origin`) or by cutting a git tag (`git tag -a 1.0.0 -m "1.0, here we come" && git push origin --tags`)

---

## Congratulations!

You've just built a CRUD todo app and API, and understand how Begin Data can persist data for your application's storage needs.

Now go [show it off](https://twitter.com/intent/tweet?text=Hey%2C%20check%20out%20my%20new%20Begin-Crud%20app%21%20%28I%20made%20it%20with%20@Begin%29%20PASTE_YOUR_URL_HERE) – people need to see this thing!

---

## Learn more about DynamoDB

[AWS DynamoDB](https://aws.amazon.com/dynamodb/) is a fully managed, highly durable, non-relational key value and document database for applications that need performance at any scale.

[Learn more about DynamoDB here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)!

---

## Additional resources

- Expand the capabilities of your app:
  - [Creating new routes](/en/functions/creating-new-functions)
  - [Add Begin Data](/en/data/begin-data/)
- [Begin reference docs](/en/getting-started/introduction)
- Get help:
  - [Begin community](https://spectrum.chat/begin)
  - [Issue tracker](https://github.com/smallwins/begin-issues/issues)
- More about Begin Data
  - [Begin Data Official docs](/en/data/begin-data/)
  - [Begin Data GitHub](https://github.com/smallwins/begin-data)
  - [Arc.codes/tables](https://arc.codes/primitives/tables)
