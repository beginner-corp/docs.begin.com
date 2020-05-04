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

First, head to your GitHub repo (from the first card in your `Activity`, or from the left nav). Find the **clone or download** button and copy the git URL.

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

`public/index.html` is your apps homepage served in the browser. Your apps styling can be found inside of this file along with our button form elements taking in attributes from the HTTP function `post-my_event`.

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