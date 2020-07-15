> ⏱ This tutorial is an introductory walkthrough on creating scheduled functions with Begin. It should take less than 10 minutes.

## Begin scheduled functions

Begin scheduled functions are an integral part of automating background processes of your app. They enable you to set up recurring tasks to run on an interval.

This gives you the ability to do things like back up your data once a week, or generate a monthly report based on user interactions. They are the serverless equivalent of a cron job.

In this tutorial, we'll show you how you can backup some data in your Begin app with scheduled functions. First, let's discuss how to set up your project and get started.

### Prerequisites

You will need to have **git** and **Node.js** installed to your local computer to follow along with this tutorial. (Learn more about [installing git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [installing Node.js](https://nodejs.org/en/download/).)

You'll also need a GitHub account. (Learn more about [signing up with GitHub](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github).)

This tutorial also assumes some familiarity with such things as:
- Text editors
- Terminal / CLI
- Git and version control
- General software development using JavaScript

You do not need to be an expert in any of these things to follow along though.

---

## Getting started

First, click the **Deploy to Begin** button below. This starts the process of authorizing Begin with your GitHub account. (You may be prompted to log in to GitHub, and/or be asked to create a Begin username.)

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-scheduled)

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

Each build undergoes several predefined build steps (learn more about [build steps here](/en/getting-started/builds-deploys#configuring-build-steps)); these build steps may install your app's dependencies (`install`), test your code's syntax (`lint`), generate any files or assets needed to run your app (`build`), and/or run an automated test suite (`test`).

If no build steps fail, then the build containing your latest commit to `master` is automatically deployed to your `staging` environment.

Go ahead and click the **Staging** link in the upper left corner of your left nav to open your new app's `staging` URL. You should now see your new app:

![Scheduled starter](/_static/screens/shared/begin-scheduled.jpg)

Hit the refresh button in your browser to see the view count rise higher. We'll learn more about what this application is doing under the hood after we've set up our project locally. 

> 💡 **Learn more!** Head here to dig deeper into [covers build pipelines, git tagging, and more](/en/getting-started/builds-deploys).

---

## Get set up locally

Next, let's get your new site running in your local environment (i.e. the computer you work on).

First, head to your GitHub repo (from the first card in your `Activity`, or the left nav). Find the **clone or download** button and copy the git URL.

Then head to your terminal and clone your repo to your local filesystem.

```bash
git clone https://github.com/your-github-username/your-new-begin-app.git
```

Once you've got your project cloned on your local machine, `cd` into the project directory and install your dependencies:

```bash
cd your-new-begin-app
npm install
```

Now you are all set to work on your app locally!

---

## Project structure

Now that your app is live on `staging` and running locally, let's take a quick look into how the project itself is structured so you'll know your way around. Here are the key folders and files in the source (`src/`) tree of your new app:

```bash
.
├── src/
│   ├── http/
│   │     └── get-index/index.js
│   ├── scheduled/
│   │     └── backup/index.js
│   └── views/
│         └── /doc.js
└── app.arc
```

### `src/http/get-index/index.js`

This is the root function of our app that serves the view. We must note that we are getting the actual `HTML` from our `views` directory, which we will discuss below. This function is also incrementing and storing each page view into a database supplied here by Begin data.

```javascript
// src/http/get-index/index.js

let data = require('@begin/data')
let HTML = require('@architect/views/doc')

exports.handler = async function http (req) {
  let { path } = req
  let visits

  if (path === '/') {
    let result = await data.incr({
      table: 'my-data',
      key: 'site',
      prop: 'visits'
    })
    visits = result.visits
    console.log('Stored a visit')
  }


  return {
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: HTML({ visits })
  }
}
```

### `src/scheduled/backup/index.js`

This is our scheduled function, and it's the main star of the app. We use this function to back up the view counts collected in our database. Now we can save a copy wherever we'd like. S3 etc. We can find out the rate of which our function does a backup inside of our `app.arc` file.

```javascript
// src/scheduled/backup/index.js

const data = require('@begin/data')

exports.handler = async function scheduled (event) {
  console.log(JSON.stringify(event, null, 2))
  let pages = await data.page({
    table: 'my-data',
    limit: 100
  })

  let count = 0
  for await (let page of pages) {
    count = count + 1
    console.log(
      'Page: ', page, '\n',
      'Count: ', count, '\n'
    )
  }
  // Now save a copy wherever you like. S3 etc.
  return
}
```

### `src/views/doc.js`

This file is serving the HTML view of our app. Every module inside our `views` folder is available to all of our `GET` functions. 

```javascript
// src/views/doc.js

module.exports = function Doc({ visits }) {
  visits = visits || ''
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/png" href="/favicon.png"/>
  <title>Architect</title>
  <style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }
    html,
    body {
      height: 100%;
    }
    body {
      display: flex;
      justify-content: center;
      padding-top: 6rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      color: white;
      background-image: linear-gradient(-45deg, #25A78B, #7A43EE);
      background-repeat: no-repeat;
    }
    .margin-bottom1 {
      margin-bottom: 0.75rem;
    }
    .text-align-center {
      text-align: center;
    }
    .font-size-m {
      font-size: 0.75rem;
    }
    .font-size-xl {
      font-size: 3rem;
    }
    .color-white {
      color: white;
    }

    @media screen and (min-width: 42em) {
      .margin-bottom1 {
        margin-bottom: 1rem;
      }
      .font-size-m {
        font-size: 1.5rem;
      }
      .font-size-xl {
        font-size: 4.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="text-align-center">
    <h1 class="margin-bottom1 font-size-xl">
      ${ visits } views
    </h1>
    <p class="font-size-m">
      Now go check out your app's <br/> <a href="https://begin.com/forward/scheduled" class="color-white">scheduled functions</a>!
    </p>
  </div>
</body>
</html>
  `
}

```

### `app.arc`

Infrastructure-as-code is the practice of provisioning and maintaining cloud infrastructure using a declarative manifest file. It’s like package.json, except for cloud resources like API Gateway, Lambda, and DynamoDB (all of which Begin apps use)

By checking in your Begin app’s project manifest (`app.arc`) file with your code, you can ensure you have the cloud resources your code depends on. This is crucial for guaranteeing reproducibility and improving iteration speed.

Your `app.arc` file is where you will provision new scheduled functions. In this particular app, you will see that we have provisioned a scheduled function named `backup` with a `rate` every 6 hours.

> 💡 **Learn more!** Head here to dig deeper into [provisioning and working with scheduled functions in Begin apps](/en/scheduled-functions/provisioning/).

---

## How scheduled functions work in this app

This app is designed to demonstrate the power of scheduled functions and Begin data. 

![Event starter](/_static/screens/shared/begin-scheduled.jpg)

Inside the `app.arc` file in the root of your project, we've added an entry to the `@scheduled` pragma to provision a new scheduled function named `backup`. This function runs on a 6 hour interval that backs up the number of page views collected inside our database provisioned inside our `get-index` function. You can save this backup wherever you'd like, such as an S3 bucket.

[Read more about the rate syntax here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html)

> ⚠️ Scheduled function names are lowercase alphanumeric and can contain dashes.

You'll notice below the view count that there is a link to your scheduled functions logs inside the back-end of your Begin account. Clicking the link will take you this page to view these logs for your scheduled functions!

![Event starter](/_static/screens/shared/begin-scheduled-2.jpg)

Awesome! Now let's move on to deploying this app to production.

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

You now have a good idea of how scheduled functions work within Begin. Your next task is to learn [Begin Data!](/en/data/begin-data)

Now go [show it off](https://twitter.com/intent/tweet?text=Hey%2C%20check%20out%20my%20new%20event%20functions%20app%21%20%28I%20made%20it%20with%20@Begin%29%20PASTE_YOUR_URL_HERE) – people need to see this thing!

<!-- TODO add domains directions -->

## Additional resources

- Expand the capabilities of your app:
  - [Creating new routes](/en/functions/creating-new-functions)
  - [Add Begin Data](/en/data/begin-data/)
- [Begin reference docs](/en/getting-started/introduction)
- Get help:
  - [Begin community](https://spectrum.chat/begin)
  - [Issue tracker](https://github.com/smallwins/begin-issues/issues)
- More about scheduled functions
  - [Scheduled functions](/en/scheduled-functions/provisioning)
  - [Architect project layout](https://arc.codes/quickstart/layout)
  - [New at Begin: add and manage routes via manifest file](https://blog.begin.com/new-at-begin-add-and-manage-routes-via-manifest-file-24ced2e65a36)
