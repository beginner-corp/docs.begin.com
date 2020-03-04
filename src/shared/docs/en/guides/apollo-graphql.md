> ⏱ This tutorial is an introductory walkthrough of creating an Apollo GraphQL app on Begin. It should take fewer than 15 minutes.

## Introduction

**Hello there, Beginner!**

This tutorial uses the [Apollo GraphQL Begin starter example](https://github.com/begin-examples/node-apollo), extended by an example API endpoint. 

### What is GraphQL?
Created by Facebook in parallel with React, GraphQL is a query language that defines a set of constraints for APIs. It has a built-in server-side runtime for fulfilling those queries with your existing data. Basically, it is used to load data from a server to a client **-- it’s a way to get data from an API into your application.** The principles of GraphQL are extremely useful building blocks for web applications.

> To learn more about GraphQL click [here](https://graphql.org/learn/) to checkout their docs!

### What is Apollo?
Apollo is the industry-standard GraphQL implementation, providing the data graph layer that connects modern apps to the cloud.

The Apollo platform is an implementation of GraphQL that can transfer data between the cloud (server) to the UI of your app. In fact, Apollo builds its environment in such a way that we can use it to handle GraphQL on the client as well as the server side of the application.

> To learn more about Apollo click [here](https://www.apollographql.com/docs/) to checkout their docs!

### Prerequisites

You will need to have **git** and **Node.js** installed to your local computer to follow along with this tutorial. (Learn more about [installing git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [installing Node.js](https://nodejs.org/en/download/).)

You'll also need a GitHub account. (Learn more about [signing up with GitHub](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github).)

Although it would be helpful to have some experience with Vue, it's not required to follow along with this tutorial. (Related, the [Vue docs](https://vuejs.org/v2/guide/) are a great reference.)

This tutorial also assumes some familiarity with such things as:
- Text editors
- Terminal / CLI
- Git and version control
- General software development using JavaScript

You do not need to be an expert in any of these things in order to follow along and make your first Apollo app in Begin!

---

## Getting started

### Create your Apollo app

First, click the **Deploy to Begin** button below. This starts the process of authorizing Begin with your GitHub account. (You may be prompted to log into GitHub, and/or be asked to create a Begin username.)

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-apollo)

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

Each build undergoes a number of predefined build steps (learn more about [build steps here](https://docs.begin.com/en/getting-started/builds-deploys#configuring-build-steps)); these build steps may install your app's dependencies (`install`), check your code's syntax for issues (`lint`), generate any files or assets needed to run your app (`build`), and/or run an automated test suite (`test`).

If no build steps fail, then the build containing your latest commit to `master` is automatically deployed to your `staging` environment.

Go ahead and click the **Staging** link in the upper left corner of your left nav to open your new app's `staging` URL. You should now see your basic Apollo GraphQL app:

![Apollo](/_static/screens/guides/apollo-graphql/apollo-screen.jpg)

> 💡 **Learn more!** Head here to dig deeper into [covers build pipelines, git tagging, and more](https://docs.begin.com/en/getting-started/builds-deploys).

---

## Make your first commit

If you'd like to jump right into making your first commit and running your first build, click the `Edit on GitHub` button. This will open your app's code in GitHub and allow you to make a quick change.

![Begin activity](/_static/screens/shared/begin-activity-2.jpg)

Look for this code, and try changing the text of the `h1` to say `My Begin + Apollo GraphQL API`:

```js
// Customize your site by changing the text of the h1
 <body>
    <h1 class="center-text">Begin + Apollo GraphQL API</h1> // Edit this line of code
    <section
      class="padding-0 background-color-dark border-radius-4"
    >
      <pre><code id="code" class="color-light">
        Loading...
      </code></pre>
    </section>
```

Click the **commit changes** button on GitHub, and head back to your `Activity` view to watch it build.

When it's done, don't forget to see your changes live in your `staging` environment!

---

## Get set up locally

Next let's get your new site running in your local environment (i.e. the computer you work on).

First, head to your GitHub repo (from the first card in your `Activity`, or from the left nav). Find the **clone or download** button and copy the git URL.

Then head to your terminal and clone your repo to your local filesystem.

```bash
git clone https://github.com/your-github-username/your-new-begin-app.git
```

Once you've got your project cloned on your local machine, `cd` into the project directory, install your dependencies, and start the local dev server:

```bash
cd your-new-begin-app
npm install
npm run dev
```

You should see a `localhost` link in your terminal – go ahead and visit that in your browser.

That's all you need to do preview your changes locally before pushing them to `staging`!

---

## Project structure

Now that your app is live on `staging` and running locally, let's take a quick look into how the project itself is structured so you'll know your way around. Here are the key folders in the source tree of your Apollo app:

```bash
.
├── public/
├── src/
│   └── http/
│       └── post-graphql/ 
└── test/
```

Let's go over each of these directories and how you may use them:

### `public/`

The `public` directory is where we host our homepage `index.html`. Inside we have an example GraphQL query that pulls in data from our HTTP function using an async function that fetches our GraphQL data graph from `src/http/post-graphql/index.js`. We then append our query results to a DOM element using `getElementById`.

```js
// public/index.html

 <!-- Example GraphQL query -->
 // Fetch data graph layer
  <script type=module>
      (async function() {
      let query = `{hello}`
      let result = await fetch('/graphql', {
        method: 'post',
        body: JSON.stringify({query}),
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
        }
      })
      let json = await result.json()
      console.log(json)

      // Append results to div element
      let code = document.getElementById('code')
      code.innerHTML = JSON.stringify(json, null, 2)
      })()
    </script>
```

### `src/http/post-graphql/`

The `POST /graphql` function constructs a schema, using GraphQL schema language and then sets up a GraphQL server that will enforce our schema's structure. Afterwards we provide resolver functions for your schema fields that will output our `Hello World` string! To learn more about GraphQL schemas, check out this section of the Apollo docs: [Build a schema](https://www.apollographql.com/docs/tutorial/schema/).

```js
// src/http/post-graphql/index.js

let arc = require('@architect/functions')
let {ApolloServer, gql} = require('apollo-server-lambda')

// Construct a schema, using GraphQL schema language
let typeDefs = gql`
  type Query {
    hello: String
  }
`
// Provide resolver functions for your schema fields
let resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

let server = new ApolloServer({typeDefs, resolvers})
let handler = server.createHandler()

exports.handler = function(event, context, callback) {
  let body = arc.http.helpers.bodyParser(event)
  // Body is now parsed, re-encode to JSON for Apollo
  event.body = JSON.stringify(body)
  handler(event, context, callback)
}
```

In the next section we will go more in depth about how to provision HTTP functions in your Apollo GraphQL app by setting up a function that displays the GraphQL playground.

> 💡 **Learn more!** Head here to dig deeper into [HTTP Functions in Begin apps](/en/http-functions/provisioning/).

### `src/test/`

Your Apollo GraphQL project comes built in with a few boilerplate tests to ensure that things are running smoothly in your app. We've even loaded some example tests for **web integration** & **Begin data** in the `src/test/example/` directory.

A solid platform is the foundation of a durable application, but tests are essential!

You can find the test script specified in package.json:

```javascript
// package.json
{
  "scripts": {
    "test": "NODE_ENV=testing tape test/*-test.js | tap-spec"
  }
}
```

Tests run via `npm test` or `npm t`.

While you can use any test runner and reporter combo you want, we recommend the [TAP family](https://testanything.org/) for testing. Test suites that require their runners to inject globals can create some very difficult to debug situations.

With that said, [Jest](https://jestjs.io/), [Enzyme](https://airbnb.io/enzyme/), [React Testing Library](https://github.com/testing-library/react-testing-library), etc. are all options available to you!

> 💡 **Learn more!** Head here to dig deeper into [the project structure of Begin apps](/en/getting-started/project-structure/).

---

## GraphQL Playground

The GraphQL Playground is an IDE (Integrated development environment) for better development workflows (GraphQL Subscriptions, interactive docs & collaboration). This playground is where you can test out your GraphQL queries for your app. You can learn more about the [GraphQL Playground here](https://github.com/prisma-labs/graphql-playground).

![Playground](/_static/screens/guides/apollo-graphql/graphql-playground.jpg)

### Provision new route for GraphQL Playground

Let's make a new route that displays our GraphQL playground on it's own page. Head to your Begin backend and navigate to the functions tab on the right sidebar. Provision a `GET` function and name it "playground". Then click `Add Function`. 

> **Don't forget** to head back to your terminal and do a `git pull` to update your project locally with your new HTTP function

![Playground](/_static/screens/guides/apollo-graphql/get-playground.jpg)

Inside of your project folder, navigate to the `src/http/get-playground/index.js` file. This [repo here](https://github.com/prisma-labs/graphql-playground/blob/master/packages/graphql-playground-html/minimal.html) provides the code that will display our playground. The code is also written below. Copy and paste this code inside of the `index.js` file.

```js
<!DOCTYPE html>
<html>

<head>
  <meta charset=utf-8/>
  <meta name="viewport" content="user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
  <title>GraphQL Playground</title>
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/graphql-playground-react/build/static/css/index.css" />
  <link rel="shortcut icon" href="//cdn.jsdelivr.net/npm/graphql-playground-react/build/favicon.png" />
  <script src="//cdn.jsdelivr.net/npm/graphql-playground-react/build/static/js/middleware.js"></script>
</head>

<body>
  <div id="root">
    <style>
      body {
        background-color: rgb(23, 42, 58);
        font-family: Open Sans, sans-serif;
        height: 90vh;
      }

      #root {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .loading {
        font-size: 32px;
        font-weight: 200;
        color: rgba(255, 255, 255, .6);
        margin-left: 20px;
      }

      img {
        width: 78px;
        height: 78px;
      }

      .title {
        font-weight: 400;
      }
    </style>
    <img src='//cdn.jsdelivr.net/npm/graphql-playground-react/build/logo.png' alt=''>
    <div class="loading"> Loading
      <span class="title">GraphQL Playground</span>
    </div>
  </div>
  <script>window.addEventListener('load', function (event) {
      GraphQLPlayground.init(document.getElementById('root'), {
        // options as 'endpoint' belong here
      })
    })</script>
</body>

</html>
```
Now let's add a button that will take us to our new playground route. Head to the `public` directory and open the `index.html` file. Add this block of code in between the `<style>` tag.

```CSS
// public/index.html

 .button {
      margin: 2rem 0 0 0;
    }

    .btn {
      background-color: #e6870b;
      padding: 1rem;
      border-radius: .5rem;
      text-decoration: none;
      color: #fff;
    }

    .btn:hover {
      background-color: #e6870bc2;
    }
```
Add this block of code after the `<section>` tag inside of the `<body>`.

```html
// public/index.html

  <div class="button"></div>
  <a href="/playground" class="btn">GraphQL Playground</a>
  </div>
```


This is how our new button will look down below. This will easily takes us to our new GraphQL playground.
![Apollo-Screen](/_static/screens/guides/apollo-graphql/apollo-screen-2.jpg)
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

When your next build is done, click the `production` link in the upper left corner to see the latest release of your app!

> **✨Tip:** You can also deploy to production from your terminal by bumping your [npm version](https://docs.npmjs.com/cli/version) (`npm version [patch|minor|major] && git push origin`) or by cutting a git tag (`git tag -a 1.0.0 -m "1.0, here we come" && git push origin --tags`)

---

## Congratulations!

You've now got a shiny new Apollo GraphQL app hosted on Begin – nice work.

Now go [show it off](https://twitter.com/intent/tweet?text=Hey%2C%20check%20out%20my%20new%20Apollo-GraphQL%20site%21%20%28I%20made%20it%20with%20@Begin%29%20PASTE_YOUR_URL_HERE) – people need to see this thing!

---

<!-- TODO add domains directions -->

## Additional resources

- Expand the capabilities of your app:
  - [Creating new routes](https://docs.begin.com/en/functions/creating-new-functions)
  - [Add Begin Data](https://docs.begin.com/en/data/begin-data/)
- [Begin reference docs](http://localhost:4445/en/getting-started/introduction)
- Get help:
  - [Begin community](https://spectrum.chat/begin)
  - [Issue tracker](https://github.com/smallwins/begin-issues/issues)

- More about Apollo
  - [Apollo homepage](https://www.apollographql.com/)
  - [Apollo docs](https://www.apollographql.com/docs/)
  - [LevelUpTuts - What Is Apollo?](https://www.youtube.com/watch?v=mSzUb7f47qk)

- More about GraphQL
  - [GraphQL: The Documentary](https://www.youtube.com/watch?v=783ccP__No8&t=140s)
  - [GraphQL homepage](https://graphql.org/)
  - [GraphQL docs](https://graphql.org/learn/)
  - [GraphQL Playground](https://github.com/prisma-labs/graphql-playground)