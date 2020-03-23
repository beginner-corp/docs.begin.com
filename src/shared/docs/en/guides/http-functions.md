> ⏱ This tutorial is an introductory walkthrough on creating HTTP Functions with Begin. It should take fewer than 10 minutes.

## Begin HTTP Functions

Getting started with Begin HTTP Functions is a fast and simple process. In this article, you will learn how to provision a new function and then fetch JSON data from it to display on the frontend of your app. This will be a great introduction into learning the anatomy of a Lambda function and how to use them inside of your apps.

### Prerequisites

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

**Provisioning an HTTP Function**

Create a new route in five easy steps
1. Head to your app’s repo folder
2. Open the `.arc` file in your root
3. Find (or add) the `@http` pragma, and on a new line, add a route ( `get /foo` )
4. Start the local dev environment (`npm start`) to generate any new HTTP Function handlers
5. Push your changes!

Your new route will instantly activate in `staging`. Then deploy to `production` to see them there, too.


> For more in depth instructions on how to provision new HTTP Functions, you can [checkout our docs here](https://docs.begin.com/en/http-functions/provisioning) or this [article on our blog](https://blog.begin.com/new-at-begin-add-and-manage-routes-via-manifest-file-24ced2e65a36). 

---

## Writing HTTP Functions

We must first understand the anatomy of a Lambda function to be able to write them for our specific use cases. All basic Lambda functions consist of one handler function.

```js
  exports.handler = async function(event, context) {
     console.log('Hello world!');
      }
```

As Lambda is an event driven service, the execution of the handler function is triggered by a user or system event. Handler takes two required arguments: an `event object` and a `context object` and an optional `callback object`.

**Event object** is the first argument of the handler function and contains information about the event, for example an API request event holds the HTTP request object.

**Context object** contains information about the invocation, function configuration and execution environment.

> **💡 Learn more!** To learn more about function handlers, read this [article from the AWS docs.](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)

--- 

## Project structure

Now that your app is live on `staging` and running locally, let's take a quick look into how the project itself is structured so you'll know your way around. Here are the key folders and files in the source tree of your new app:

```bash
.
├── public/
│   ├── index.html
│   └── index.js
├── src/ 
│   └── http/
│        └── get-foo/
└── .arc
```

### `public/index.html` & `public/index.js`

`public/index.html` is the page served in the browser. This is where our JSON data will be appended to a DOM element of our choosing. `public/index.js` is where we will write our function that fetches the JSON data from `GET /foo` and creates the element to append to the DOM

### `src/http/get-foo/`
Your app utilizes this built-in small, fast, individually executing cloud function that handles HTTP API requests and responses. (We call those HTTP functions, for short.)

The HTTP function that handles requests to `GET /foo` is found in `src/http/get-foo/`.

In the next section we will go more in depth about how to pass around data between your HTTP Functions.

### `.arc`
Your `.arc` file is where you will provision new routes and functions.

Infrastructure-as-code is the practice of provisioning and maintaining cloud infrastructure using a declarative manifest file. It’s like package.json, except for cloud resources like API Gateway, Lambda, and DynamoDB (all of which Begin apps use)

By checking in your Begin app’s project manifest (.arc) file with your code, you can ensure you have exactly the cloud resources your code depends on. This is crucial for ensuring reproducibility and improving iteration speed.

> 💡 **Learn more!** Head here to dig deeper into [HTTP Functions in Begin apps](/en/http-functions/provisioning/).
---

## Fetching data between functions

Earlier we provisioned a new function called `GET /foo`. We will use this function to create an API that sends out a JSON object with a key:value pair of `message: Hello from your Begin API!`. Navigate to `src/http/get-foo/index.js` and copy & paste the code below. Now you can fetch data from this function from anywhere inside of your app!

```js
// src/http/get-foo/index.js

exports.handler = async function http (req) {
  console.log('Begin API called')
  return {
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify({
      message: 'Hello from your Begin API!'
    })
  }
}
```
Now let's append this JSON object to a DOM element on the frontend of our app. First navigate to the root of your app and then open the `public/index.html` directory. Find the section below and add this `<p>` element with an id of #myData:

```html
<!--public/index.html -->

 <div>
      <p style="margin-bottom: 8px">
        View documentation at:
      </p>
      <a class="link" href="https://docs.begin.com" target="_blank">https://docs.begin.com</a>
    </div>
    <p id="myData">...Testing</p>  <!-- Add this line.-->
</div>
```

Now open the `public/index.js` file and create this function. This async function will fetch the JSON data from the `GET /foo` function we provisioned earlier and then append it to the DOM.

```js
// public/index.js

;(async function main() {
    let mydata = await (await fetch('/foo')).json()
    document.querySelector('#myData').innerHTML = mydata.message
    console.log(mydata)
    return {
        body: JSON.stringify(mydata.body)
      }
  })();
```
Now you can see the data from our HTTP Function is being passed to our frontend by appending it to the DOM with a `querySelector`!

![Hello World Starter](/_static/screens/shared/begin-hello-world-api.jpg)

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

You now have a good idea on how HTTP Functions work within Begin. Your next task is to learn [Begin Data!](https://docs.begin.com/en/http-functions/provisioning)

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
- More about HTTP Functions
  - [HTTP Functions](https://docs.begin.com/en/http-functions/provisioning)
  - [Architect project layout](https://arc.codes/quickstart/layout)
  - [New at Begin: add and manage routes via manifest file](https://blog.begin.com/new-at-begin-add-and-manage-routes-via-manifest-file-24ced2e65a36)
