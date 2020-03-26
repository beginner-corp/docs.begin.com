> ⏱ This tutorial is an introductory walkthrough on creating databases with Begin Data. It should take fewer than 10 minutes.

## Introduction

[Begin Data](https://docs.begin.com/en/data/begin-data/) is an easy to use, fast, durable, highly scalable, fully managed, SSD-based key-value and document database built on top of DynamoDB. Think of it as syntactic sugar for making DynamoDB easier to work with. Begin Data comes bundled with every Begin app and is designed to accommodate most general persistence use cases. It's core API has three simple methods: `get`, `set`, and `destroy`. In this tutorial, we will show you how to setup and start using Begin Data in your Begin app.

[DynamoDB](https://aws.amazon.com/dynamodb/) is a non relational(noSQL) key-value and document database for applications that need performance at any scale. Read the official AWS docs on [DynamoDB here.](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)

## Prerequisites

You will need to have **git** and **Node.js** installed to your local computer to follow along with this tutorial. (Learn more about [installing git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [installing Node.js](https://nodejs.org/en/download/).)

You'll also need a GitHub account. (Learn more about [signing up with GitHub](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github).)

This tutorial also assumes some familiarity with such things as:
- Text editors
- Terminal / CLI
- Git and version control
- General software development using JavaScript

You do not need to be an expert in any of these things in order to follow along and make your first crud app in Begin!

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

Each build undergoes a number of predefined build steps (learn more about [build steps here](http://localhost:4445/en/getting-started/builds-deploys#configuring-build-steps)); these build steps may install your app's dependencies (`install`), test your code's syntax (`lint`), generate any files or assets needed to run your app (`build`), and/or run an automated test suite (`test`).

If no build steps fail, then the build containing your latest commit to `master` is automatically deployed to your `staging` environment.

Go ahead and click the **Staging** link in the upper left corner of your left nav to open your new app's `staging` URL. You should now see your new app:

![CRUD Starter](/_static/screens/shared/begin-crud.jpg)

> 💡 **Learn more!** Head here to dig deeper into [covers build pipelines, git tagging, and more](https://docs.begin.com/en/getting-started/builds-deploys).

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
git clone https://github.com/your-github-username/your-new-begin-app.git
```
---

## Project structure

Now that your app is live on staging and running locally, let's take a quick look into how the project itself is structured so you'll know your way around. Here are the key folders and files in the source tree of your new app:
```bash
.
├── public/
│   └── index.html
└── src/
    └── http/
         ├── get-todos/
         ├── post-todos/
         └── post-todos-delete/
```
### `public/index.html`

This directory hold the page that is served in the browser. This is also where our apps CSS styles and JavaScript live. Here, we will fetch our todos from our HTTP functions and append them to elements on the DOM while manipulating the state of our app.

### `src/http/get-todos/`
This function allows you to read the current `todos` from your `todos` database table that were created with the HTML form on the home page.

```js
// `src/http/get-todos`

const data = require('@begin/data')

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
This is the function that creates todos on your `todos` database table when text is entered on the HTML form. 

```js
// `src/http/post-todos`

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
This function simply deletes any of the todos from your database table.

```js
// `src/http/post-todos-delete`

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

### API

**The core API is three methods:**

- `data.get(params[, callback])` → [Promise] for retrieving data
- `data.set(params[, callback])` → [Promise] for writing data
- `data.destroy(params[, callback])` → [Promise] for removing data

**Additional helper methods are also made available:**

- `data.incr(params[, callback])` → [Promise] increment an attribute on a document
- `data.decr(params[, callback])` → [Promise] decrement an attribute on a document
- `data.count(params[, callback])` → [Promise] get the number of documents for a given table

All methods accept a params object and, optionally, a Node-style errback. If no errback is supplied, a Promise is returned. All methods support async/await.

### Writes
Save a document in a table by key. Remember: `table` is required; `key` is optional.

```js
let taco = await data.set({
  table: 'tacos',
  key: 'al-pastor'
})
```
All documents have a key. If no key is given, set will generate a unique key.

```js
let token = await data.set({
  table: 'tokens',
})
// {table:'tokens', key:'LCJkYX9jYWwidW50RhSU'}
```
Batch save multiple documents at once by passing an Array of Objects.

```js
let collection = await data.set([
  {table: 'ppl', name:'brian', email:'b@brian.io'},
  {table: 'ppl', name:'sutr0', email:'sutr0@brian.io'},
  {table: 'tacos', key:'pollo'},
  {table: 'tacos', key:'carnitas'},
])
```

### Reads

Read a document by key:

```js
let yum = await data.get({
  table: 'tacos',
  key: 'baja'
})
```
Batch read by passing an Array of Objects. With these building blocks you can construct secondary indexes and joins, like one-to-many and many-to-many.

```js
await data.get([
  {table:'tacos', key:'carnitas'},
  {table:'tacos', key:'al-pastor'},
])
```

### Destroy

Delete a document by key.

```js
await data.destroy({
  table: 'tacos',
  key: 'pollo'
})
```

Batch delete documents by passing an Array of Objects.

```js
await data.destroy([
  {table:'tacos', key:'carnitas'},
  {table:'tacos', key:'al-pastor'},
])
```

## Begin Data in Action

So how do all of these functions come together to create the Todo functionality of the app? This happens inside of the `public/index.html` file. In between the `<script>` tag we can find the code doing the heavy lifting. Let's explain what's going on here.

First, be aware that we have wrapped all of our business logic in an **IIFE(Immediately-invoked Function Expression)**. This is to make sure that this function is always ran when the page is loaded.

The app is kicked off with the function `init()` below. Then we fetch all the todos that have been input into the form and reside on our database.

```js
// Kick off the app
      init()

      // GET all todos
      function init() {
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
```
Now we define a set of variables that will append the correct state and data view to our DOM.

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

Head on back to Begin and open your `staging` URL once your build is complete. Looking good? Excellent.

Now let's deploy to `production`: click the **Deploy to production** button in the upper left, pick a version, leave an optional message summarizing your changes, and **Ship it**!

When your next build is done, click the `production` link in the upper left corner to see the latest release of your app.

> **✨Tip:** You can also deploy to production from your terminal by bumping your [npm version](https://docs.npmjs.com/cli/version) (`npm version [patch|minor|major] && git push origin`) or by cutting a git tag (`git tag -a 1.0.0 -m "1.0, here we come" && git push origin --tags`)

---

## Congratulations!

You now have a good idea on how Begin Data works within your app. 

Now go [show it off](https://twitter.com/intent/tweet?text=Hey%2C%20check%20out%20my%20new%20Begin-Crud%20app%21%20%28I%20made%20it%20with%20@Begin%29%20PASTE_YOUR_URL_HERE) – people need to see this thing!

<!-- TODO add domains directions -->

## Additional resources

- Expand the capabilities of your app:
  - [Creating new routes](https://docs.begin.com/en/functions/creating-new-functions)
  - [Add Begin Data](https://docs.begin.com/en/data/begin-data/)
- [Begin reference docs](http://localhost:4445/en/getting-started/introduction)
- Get help:
  - [Begin community](https://spectrum.chat/begin)
  - [Issue tracker](https://github.com/smallwins/begin-issues/issues)
- More about Begin Data
  - [Begin Data Official docs](https://docs.begin.com/en/data/begin-data/)
  - [Begin-Data GitHub](https://github.com/smallwins/begin-data)
  - [Arc.codes/tables](https://arc.codes/primitives/tables)
