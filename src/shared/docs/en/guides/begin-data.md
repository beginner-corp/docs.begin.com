> ⏱ This tutorial is an introductory walkthrough on creating databases with Begin Data. It should take fewer than 10 minutes.

## Introduction

[Begin Data](https://docs.begin.com/en/data/begin-data/) is a DynamoDB client for creating a special table schema that is generic. 

Begin Data is an easy to use, fast, and durable key/value and document store built on top of DynamoDB. Originally built for Begin serverless apps, 

Think of it as syntactic sugar for making DynamoDB easier to work with in your Begin app. It is an easy to use, fast, durable, highly scalable, fully managed, SSD-based key-value and document database that comes bundled with every Begin app. Begin Data is easy to learn and simple to implement, and is designed to accommodate most general persistence use cases. Begin Data’s core API has three simple methods: get, set, and destroy. In this tutorial, we will how to setup a persistent database in your Begin app.

[DynamoDB](https://aws.amazon.com/dynamodb/) is a non relational(noSQL) key-value and document database for applications that need performance at any scale. Read the official AWS docs on [DynamoDB here.](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)

## Prerequisites

You will need to have **git** and **Node.js** installed to your local computer to follow along with this tutorial. (Learn more about [installing git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [installing Node.js](https://nodejs.org/en/download/).)

You'll also need a GitHub account. (Learn more about [signing up with GitHub](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github).)

This tutorial also assumes some familiarity with such things as:
- Text editors
- Terminal / CLI
- Git and version control
- General software development using JavaScript

You do not need to be an expert in any of these things in order to follow along and make your first Vue app in Begin!

---

## Getting started

First, click the **Deploy to Begin** button below. This starts the process of authorizing Begin with your GitHub account. (You may be prompted to log into GitHub, and/or be asked to create a Begin username.)

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-hello-world)

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

![Hello World Starter](/_static/screens/shared/begin-hello-world.jpg)

> 💡 **Learn more!** Head here to dig deeper into [covers build pipelines, git tagging, and more](https://docs.begin.com/en/getting-started/builds-deploys).

---

## Make your first commit

Click the `Edit on GitHub` button to push your first commit. This will take you to GitHub where you can edit the `public/index.html` file of your project.

![Name your Begin app and repo](/_static/screens/shared/begin-activity-2.jpg)

Let's simply change the word "Beginner" to your own name. Click the commit changes button and now you've made your first commit!

```html
 <h1 style="margin-bottom: 24px" class="center-text">
        Howdy, Beginner!  <!--Edit this line  -->
 </h1>
```
Now git clone the repo to your local machine. Navigate into the project and open it in your favorite text editor. In the next section we will go over how to add Begin Data.

---

## Add Begin Data

You're a natural! Now let's add Begin Data

**Create a new Table in five easy steps**
1. Head to your app’s repo folder
2. Open the `.arc` file in your root
3. Find (or add) the `@table` pragma, and on a new line, add a route ( `get /foo` )
4. Start the local dev environment (`npm start`) to generate any new HTTP Function handlers
5. Push your changes!

Your new route will instantly activate in `staging`. Then deploy to `production` to see them there, too.

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

Now go [show it off](https://twitter.com/intent/tweet?text=Hey%2C%20check%20out%20my%20new%20HTTP-Functions%20app%21%20%28I%20made%20it%20with%20@Begin%29%20PASTE_YOUR_URL_HERE) – people need to see this thing!

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
  - [HTTP Functions](https://docs.begin.com/en/http-functions/provisioning)
  - [Architect project layout](https://arc.codes/quickstart/layout)
  - [New at Begin: add and manage routes via manifest file](https://blog.begin.com/new-at-begin-add-and-manage-routes-via-manifest-file-24ced2e65a36)
