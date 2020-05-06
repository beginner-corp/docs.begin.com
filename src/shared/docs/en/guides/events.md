> ⏱ This tutorial is an introductory walkthrough on creating event functions with Begin. It should take less than 10 minutes.

## Begin event functions

Getting started with Begin event functions should take just a few minutes, but lay the groundwork for creating your own [publish / subscribe message bus](https://aws.amazon.com/pub-sub-messaging/) for your application.

Asynchronous tasks are a very common requirement in most modern applications. For example: say someone signs up for your newsletter.

You don’t want your user to wait around for your application to respond while it makes API calls to your mailing list service.

Instead, what you probably want is to publish a JSON payload to a dedicated, asynchronous subscribing event listener — this is commonly known as the pub / sub (or publish / subscribe) model.

In this tutorial, we'll show you how you can kick off background tasks in your Begin app with event functions. First, let's discuss how to set up your project and get started.


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

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-events)


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

![Event starter](/_static/screens/shared/begin-events.jpg)

We'll learn more about what these three buttons do after the project is set up locally.

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

Now that your app is live on `staging` and running locally, let's take a quick look into how the project itself is structured so you'll know your way around. Here are the key folders and files in the source tree of your new app:

```bash
.
├── public/
│   └── index.html
├── src/
│   ├── events/
│   │    └── my-event/
│   └── http/
│        └── post-my_event/
└── .arc
```

### `public/index.html`

`public/index.html` is the page served to the browser. Your app's styling can be found inside of this file along with our button form elements taking in attributes from the HTTP function `post-my_event`.


### `src/events/my-event/`

Your app utilizes this built-in small, fast, individually executing cloud function that handle subscribing to events – (We call those event functions, for short.)

After receiving an incoming payload published from another function, this event handler then executes its business logic. (To tidy up the incoming event payloads, we suggest running your event functions through our runtime library, [Architect Functions](https://www.npmjs.com/package/@architect/functions) – which this example already does.)


### `src/http/post-my_event/`

As we just mentioned, the recommended (and easiest) way to work with events is the [Architect Functions](https://www.npmjs.com/package/@architect/functions). In this project, our HTTP `post /my-event` uses Architect Functions to publishing to the `my-event` event.


### `.arc`

Your `.arc` file is where you will provision new events and functions.

Infrastructure-as-code is the practice of provisioning and maintaining cloud infrastructure using a declarative manifest file. It’s like package.json, except for cloud resources like API Gateway, Lambda, and DynamoDB (all of which Begin apps use)

By checking in your Begin app’s project manifest (.arc) file with your code, you can ensure you have exactly the cloud resources your code depends on. This is crucial for ensuring reproducibility and improving iteration speed.

> 💡 **Learn more!** Head here to dig deeper into [provisioning and working with event functions in Begin apps](/en/event-functions/provisioning/).

---

## How events work in this app

This app is designed to demonstrate the power of event functions and Begin data. Each button is wire to an event publisher that increments a counter in the backend when clicked. Let's see what this looks like in code.

![Event starter](/_static/screens/shared/begin-events.jpg)

This is our event publisher:

```js
// src/http/post-my_event/index.js
const arc = require('@architect/functions')

exports.handler = async function http (req) {
  const name = 'my-event'
  const payload = { body: req.body }
  await arc.events.publish({ name, payload })
  return {
    statusCode: 302,
    headers: {
      location: '/'
    }
  }
}
```

When you click on one of the three buttons, it posts to the `post /my-event` endpoint above, which in turn publishes an event to the `my-event` event subscriber.

Our subscriber holds updates an atomic counter whenever it receives a new event; to do this we have a table named `interactions` with key of `clicks`, which we'll increment with each invocation.

![Event starter](/_static/screens/shared/begin-events-2.jpg)

```js
// src/events/my-event/index.js

const queryString = require('querystring')
const arc = require('@architect/functions')
const data = require('@begin/data')
const table = 'interactions'
const key = 'clicks'

async function myEvent(event) {
  let raw = queryString.parse(
    Buffer.from(event.body, 'base64').toString()
  )
  let prop = raw.name
  let count = await data.incr({
    table,
    key,
    prop
  })

  return
}

exports.handler = arc.events.subscribe(myEvent)
```

That’s it, you’re done! Now you have an infinitely scalable pub / sub message bus at your disposal, meaning your application can respond quickly to user requests, and handle complex background tasks asynchronously.

Our goal at Begin is to unlock the full power of modern application architectures with minimal effort and complexity. With Begin event functions, the potential capabilities of your apps just grew enormously!

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

You now have a good idea of how event functions work within Begin. Your next task is to learn [Begin Data!](/en/data/begin-data)

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
