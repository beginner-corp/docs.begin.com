> ⏱ This tutorial is an introductory walkthrough on creating scheduled functions with Begin. It should take less than 10 minutes.

## Begin scheduled functions

Begin scheduled functions are used to set up recurring tasks to run on an interval. Scheduled functions enable you to do things like back up your data once a week, or generate a weekly report based on user interactions. They are the serverless equivalent of a cron job. The functionality of scheduled functions can also be paired with event functions to trigger reoccurring events inside of your app. 

### Provisioning new scheduled functions

The `.arc` file in the root of your project is where you define all of your app's infrastructure as code. Add an entry to the `@scheduled` section to provision a new scheduled function.

```
@scheduled
data-backup rate(1 day)
```

Above is an example of a scheduled function `data-backup` entry with a rate specified `rate(1 day)`.

[Read more about the `cron` & `rate` syntax here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html)

### Prerequisites

You need to have **git** and **Node.js** installed to your local computer to follow along with this tutorial. (Learn more about [installing git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [installing Node.js](https://nodejs.org/en/download/).)

You'll also need a GitHub account. (Learn more about [signing up with GitHub](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github).)

This tutorial also assumes some familiarity with such things as:
- Text editors
- Terminal / CLI
- Git and version control
- General software development using JavaScript

You do not need to be an expert in any of these things to follow along, however.

---

## Getting started

First, click the **Deploy to Begin** button below. This starts the process of authorizing Begin with your GitHub account. (You may be prompted to log in to GitHub, and be asked to create a Begin username.)

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-scheduled)


### Name your app & repo

You'll then be prompted to name your new app and repository – this is optional, feel free to use the default app and repo name if you like!

> Note: your Begin app name and repository name cannot be changed later.

![Name your Begin app and repo](/_static/screens/shared/begin-repo-name.jpg)

Once you've clicked the `Create...` button, Begin spins up your new project on GitHub (under `github.com/{your GH username}/{your repo name}`).

> By default, your Begin app repo is created as a public GitHub repo; it can be set to private by granting Begin additional permissions from this screen (or later from the `Settings` screen found in the left nav of your Begin app).

---

## Your first deploy

After creating your app, you'll be taken to its `Activity` stream. Welcome to the central backend interface of your Begin app!

![Begin Activity view](/_static/screens/shared/begin-activity.jpg)

From the `Activity` view, you'll be able to watch your app build & deploy in real-time. Any time you push to `master`, you'll see a new build get kicked off in Begin.

Each build undergoes several predefined build steps (learn more about [build steps here](/en/getting-started/builds-deploys#configuring-build-steps)); these build steps may install your app's dependencies (`install`), test your code's syntax (`lint`), generate any files or assets needed to run your app (`build`), and run an automated test suite (`test`).

If no build steps fail, then the build containing your latest commit to `master` is automatically deployed to your `staging` environment.

Go ahead and click the **Staging** link in the upper left corner of your left nav to open your new app's `staging` URL. You should now see your new app:

![Scheduled starter](/_static/screens/shared/begin-scheduled.jpg)

Refresh the page and watch the counter go up!

> 💡 **Learn more!** Head here to dig deeper into [covers build pipelines, git tagging, and more](/en/getting-started/builds-deploys).

---

## Get set up locally

Next, let's get your new site running in your local environment (i.e., the computer you work on).

First, head to your GitHub repo (from the first card in your `Activity`, or the left nav) and find the **clone or download** button and copy the git URL.

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

Now that your app is live on `staging` and running locally let's take a quick look into how the project itself is structured so you'll know your way around. Here are the key folders and files in the source tree of your new app:

```bash
.
├── src/
│   ├── http/
│   │    └── get-index/
│   ├── scheduled/
│   │    └── backup/
│   └── views/
│        └── doc.js
└── .arc
```

### `src/http/get-index`

`src/http/get-index` is the page served to the browser with our HTML `body` payload being imported from `src/views/doc.js` along with the current number of `visits`. We use Begin data to hold the `count` of our session state and store it in a `table` called `my-data`. It gets incremented upon every refresh or new visit.

### `src/scheduled/backup`

This directory holds the crux of the functionality of our app. We use Begin data to create a backup of our page `count`. This backup function runs on a schedule every 6 hours as provisioned inside our `.arc` manifest file.

### `src/views/doc.js`

You'll find your app's HTML and CSS styling are inside of this file, but most importantly, the `visits` are being displayed on the frontend showing off the cool functionality of HTTP functions.

### `.arc`

Your `.arc` manifest file is where you provision new scheduled functions.

Infrastructure-as-code is the practice of provisioning and maintaining cloud infrastructure using a declarative manifest file. It's like package.json, except for cloud resources like API Gateway, Lambda, and DynamoDB (all of which Begin apps use)

By checking in your Begin app's project manifest (`.arc`) file with your code, you can ensure you have precisely the cloud resources your code depends on to function. This is crucial for ensuring reproducibility and improving iteration speed.

> 💡 **Learn more!** Head here to dig deeper into [provisioning and how to work with event functions in Begin apps](/en/event-functions/provisioning/).

---

## How scheduled functions work

This app is designed to demonstrate the power of scheduled functions and Begin data. Every visit to this page is stored in a Begin data table that is then backed up every 6 hours using our scheduled function. The count of every visit is incremented and displayed instantly on the frontend of our small app.

![Scheduled starter](/_static/screens/shared/begin-scheduled.jpg)


This HTTP function is capturing the number of visits to the page and incrementing the count by 1 upon every new visit. It is also storing this data inside of our Begin data `table` simultaneously. 

```js
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

Our scheduled function then backups our `database every 6 hours. From here, it can then be saved anywhere you'd like. S3 etc.

```js
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

Clicking the link where it says, "Now go check out your app's
scheduled functions!" takes you to the Scheduled functions
panel in the backend of your Begin app. This view is helpful because it gives you an objective view and logs of how your functions are working within your app.

![Scheduled starter](/_static/screens/shared/begin-scheduled-2.jpg)


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

Head on back to Begin and open your `staging` URL once your build is complete. Are you looking good? Excellent.

Now let's deploy to `production`: click the **Deploy to production** button in the upper left, pick a version, leave an optional message summarizing your changes, and **Ship it**!

When your next build is done, click the `production` link in the upper left corner to see the latest release of your app.

> **✨Tip:** You can also deploy to production from your terminal by bumping your [npm version](https://docs.npmjs.com/cli/version) (`npm version [patch|minor|major] && git push origin`) or by cutting a git tag (`git tag -a 1.0.0 -m "1.0, here we come" && git push origin --tags`)

---

## Congratulations!

You now have a good idea of how scheduled functions work within Begin. Your next task is to learn [Begin Data!](/en/data/begin-data)

Now go [show it off](https://twitter.com/intent/tweet?text=Hey%2C%20check%20out%20my%20new%20scheduled%20functions%20app%21%20%28I%20made%20it%20with%20@Begin%29%20PASTE_YOUR_URL_HERE) – people need to see this thing!

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
  - [scheduled functions](/en/scheduled-functions/provisioning)
  - [Architect project layout](https://arc.codes/quickstart/layout)
  - [New at Begin: add and manage routes via manifest file](https://blog.begin.com/new-at-begin-add-and-manage-routes-via-manifest-file-24ced2e65a36)
