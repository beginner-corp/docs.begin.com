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

Go ahead and click the **Staging** link in the upper left corner of your left nav to open your new app's `staging` URL. You should now see your basic Apollo app:

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
│   ├── http/
│   │   └── get-api/
│   ├── App.svelte
│   └── main.mjs
└── rollup.config.js
```

Let's go over each of these directories and how you may use them: