> ⏱ This tutorial is an introductory walkthrough on creating Event functions with Begin. It should take less than 10 minutes.

## Begin event functions

Getting started with Begin event functions should take just a few minutes, but lay the groundwork for creating your own pub / sub [message bus](https://www.enterpriseintegrationpatterns.com/patterns/messaging/MessageBus.html) for your application.

Asynchronous tasks are a very common requirement in most modern applications. **For example: say someone signs up for your newsletter.**

You don’t want your user to wait around for your application to respond while it makes API calls to your mailing list service.

Instead, what you probably want is to publish a JSON payload to a dedicated, asynchronous subscribing event listener — this is commonly known as the[ pub / sub (or publish / subscribe) model.](https://aws.amazon.com/pub-sub-messaging/)

In this tutorial, we will show you how event functions work within your begin app but first let's discuss how to set up your project and get started.

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

Each build undergoes several predefined build steps (learn more about [build steps here](http://localhost:4445/en/getting-started/builds-deploys#configuring-build-steps)); these build steps may install your app's dependencies (`install`), test your code's syntax (`lint`), generate any files or assets needed to run your app (`build`), and/or run an automated test suite (`test`).

If no build steps fail, then the build containing your latest commit to `master` is automatically deployed to your `staging` environment.

Go ahead and click the **Staging** link in the upper left corner of your left nav to open your new app's `staging` URL. You should now see your new app:

![Event starter](/_static/screens/shared/begin-events.jpg)

Don't worry. You'll learn more about what these three buttons do after we've set up our project on our local machines.

> 💡 **Learn more!** Head here to dig deeper into [covers build pipelines, git tagging, and more](https://docs.begin.com/en/getting-started/builds-deploys).

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
│        └── post-my-event/
└── .arc
```

### `public/index.html` 

`public/index.html` is your app's homepage served in the browser. Your apps styling can be found inside of this file along with our button form elements taking in attributes from the HTTP function `post-my_event`.

### `src/events/my-event/`
This directory holds our subscriber – also known as our event function. This handler receives the incoming payload and executes its business logic. To tidy up the incoming event payload, we suggest running your event functions through our runtime helper, Architect Functions: `cd src/events/newsletter-add && echo {} > package.json && npm i @architect/functions`

### `src/http/post-my_event/`
The recommended (and easiest) way to publish an event is to use the `@architect/functions` runtime helper. In this project, our HTTP post endpoint is publishing to the `my-event` event.

### `.arc`
Your `.arc` file is where you will provision new events and functions.

Infrastructure-as-code is the practice of provisioning and maintaining cloud infrastructure using a declarative manifest file. It’s like package.json, except for cloud resources like API Gateway, Lambda, and DynamoDB (all of which Begin apps use)

By checking in your Begin app’s project manifest (.arc) file with your code, you can ensure you have exactly the cloud resources your code depends on. This is crucial for ensuring reproducibility and improving iteration speed.

> 💡 **Learn more!** Head here to dig deeper into [Event functions in Begin apps](/en/event-functions/provisioning/).

---

## Provision event functions

Adding an entire pub / sub message bus to your app may sound complex, but it’s remarkably straightforward in Begin:

Provision a new event in five easy steps
1. Make sure you are in your project's folder on your computer
2. Open the `.arc` file in the root of your project.
3. Find (or add) the `@events` pragma, and on a new line, add an event ( `my-event` ).
4. Start the local dev environment (`npm start`) to generate any new event function handlers.
5. Push your changes!

Your new event will automatically deploy to `staging`.
If you are happy with `staging` you can click the "Deploy to Production" button to see it live on your production environment.

> For more in-depth instructions on how to provision new Event functions, you can [checkout our docs here](https://docs.begin.com/en/event-functions/provisioning) or this [article on our blog](https://blog.begin.com/a-brand-new-primitive-for-your-begin-apps-event-functions-9cdfd2bb3dcb).

---

## How events work in this app

This app shows us both the power of event functions and Begin data! Each button is hooked up to our event publisher that then sends an incremented count of `+1` when they are clicked. Let's see what this looks like in code.

![Event starter](/_static/screens/shared/begin-events.jpg)

This is our event publisher:

```js
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

Our event subscriber holds the business logic that updates the count (# of times a button was clicked). We have a table named `interactions` with a key that is equivalent to `clicks` that is incremented by `1` every time a button is clicked.

![Event starter](/_static/screens/shared/begin-events-2.jpg)

```js
const queryString = require('querystring')
const arc = require('@architect/functions')
const data = require('@begin/data')
const table = 'interactions'
const key = 'clicks'

async function myEvent(event) {
  let raw = queryString.parse(
    new Buffer.from(event.body, 'base64').toString()
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

Our goal at Begin is to unlock the full power of modern application architectures with minimal effort and complexity. With Begin event functions, the potential capabilities of your apps just grew enormously — we can’t wait to see what you’ll build!

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

You now have a good idea of how Event functions work within Begin. Your next task is to learn [Begin Data!](https://docs.begin.com/en/http-functions/provisioning)

Now go [show it off](https://twitter.com/intent/tweet?text=Hey%2C%20check%20out%20my%20new%20Event-Functions%20app%21%20%28I%20made%20it%20with%20@Begin%29%20PASTE_YOUR_URL_HERE) – people need to see this thing!

<!-- TODO add domains directions -->

## Additional resources

- Expand the capabilities of your app:
  - [Creating new routes](https://docs.begin.com/en/functions/creating-new-functions)
  - [Add Begin Data](https://docs.begin.com/en/data/begin-data/)
- [Begin reference docs](http://localhost:4445/en/getting-started/introduction)
- Get help:
  - [Begin community](https://spectrum.chat/begin)
  - [Issue tracker](https://github.com/smallwins/begin-issues/issues)
- More about HTTP functions
  - [HTTP functions](https://docs.begin.com/en/http-functions/provisioning)
  - [Architect project layout](https://arc.codes/quickstart/layout)
  - [New at Begin: add and manage routes via manifest file](https://blog.begin.com/new-at-begin-add-and-manage-routes-via-manifest-file-24ced2e65a36)
