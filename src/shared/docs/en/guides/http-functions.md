> ⏱ This tutorial is an introductory walkthrough on creating HTTP Functions with Begin. It should take less than 10 minutes.

## Begin HTTP functions

Getting started with Begin HTTP functions should take just a few minutes, but lay the groundwork for creating your own APIs.  In this article, you will learn how to provision a new function and then fetch JSON data from it to display in your app's frontend. This will be a great introduction to what goes in an HTTP function and how to use them to deliver data to your apps.

### Prerequisites

You will need to have **git** and **Node.js** installed to your local computer to follow along with this tutorial. (Learn more about [installing git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) and [installing Node.js](https://nodejs.org/en/download/).)

You'll also need a GitHub account. (Learn more about [signing up with GitHub](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github).)

This tutorial also assumes some familiarity with such things as:
- Text editors
- Terminal / CLI
- Git and version control
- General software development using JavaScript

You do not need to be an expert in any of these things in order to follow along though.

---

## Getting started

First, click the **Deploy to Begin** button below. This starts the process of authorizing Begin with your GitHub account. (You may be prompted to log into GitHub, and/or be asked to create a Begin username.)

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-minimal)

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

## Get set up locally

Next let's get your new site running in your local environment (i.e. the computer you work on).

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

## Add an HTTP function

**Provisioning an HTTP Function**

Create a new route in five easy steps
1. Make sure you are in your project's folder on your computer
2. Open the `.arc` file in the root of your project
3. Find (or add) the `@http` pragma, and on a new line, add a route ( `get /api` )
4. Start the local dev environment (`npm start`) to generate any new HTTP Function handlers
5. Push your changes!

Your new route will automatically deploy to `staging`.
If you are happy with `staging` you can click the "Deploy to Production" button to see it live on your production environment.

> For more in depth instructions on how to provision new HTTP functions, you can [checkout our docs here](https://docs.begin.com/en/http-functions/provisioning) or this [article on our blog](https://blog.begin.com/new-at-begin-add-and-manage-routes-via-manifest-file-24ced2e65a36).

---

## Writing HTTP functions

We must first understand the anatomy of an HTTP function to be able to write them for our specific use cases. All basic HTTP functions consist of one handler function.

```js
  exports.handler = async function(req) {
    console.log('REQUEST OBJECT: ', req);
  }
```

HTTP functions are invoked when you navigate to a URL in your app. This `get /api` function we just generated by running `npm start` is called when we navigate our browser to `localhost:3333/api`. These HTTP functions are passed a `request object` or `req` which contains information about the request to this function. Any data we return from this function is available to our app running in the browser, all we need to do now is request it.

> **💡 Learn more!** To learn more about HTTP functions by reading this [article from the Architect docs.](https://arc.codes/primitives/http)

---

## Project structure

Now that your app is live on `staging` and running locally, let's take a quick look into how the project itself is structured so you'll know your way around. Here are the key folders and files in the source tree of your new app:

```bash
.
├── public/
│   ├── index.html
│   └── index.html
├── src/
│   └── http/
│        └── get-api/
└── .arc
```

### `public/index.html` & `public/index.js`

`public/index.html` is the page served in the browser. This is where our JSON data will be appended to a DOM element of our choosing. `public/index.js` is where we will write our function that fetches the JSON data from `get /api` and displays it in our HTML page.

### `src/http/get-api/`
Your app utilizes this built-in small, fast, individually executing cloud function that handles HTTP API requests and responses. (We call those HTTP functions, for short.)

The HTTP function that handles requests to `get /api` is found in `src/http/get-api/`.

In the next section we will go more in-depth about how to fetch data from an HTTP Function.

### `.arc`
Your `.arc` file is where you will provision new routes and functions.

Infrastructure-as-code is the practice of provisioning and maintaining cloud infrastructure using a declarative manifest file. It’s like package.json, except for cloud resources like API Gateway, Lambda, and DynamoDB (all of which Begin apps use)

By checking in your Begin app’s project manifest (.arc) file with your code, you can ensure you have exactly the cloud resources your code depends on. This is crucial for ensuring reproducibility and improving iteration speed.

> 💡 **Learn more!** Head here to dig deeper into [HTTP functions in Begin apps](/en/http-functions/provisioning/).
---

## Fetching data from HTTP functions

Earlier we provisioned a new function called `get /api`. We will use this function to create an API that sends out a JSON object with a key:value pair of `message: Hello from your Begin API!`. Navigate to `src/http/get-api/index.js` and copy & paste the code below. Now you can fetch data from this function from anywhere inside of your app!

```js
// src/http/get-api/index.js

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

Now navigate to `localhost:3333/api` to see your message being returned from you new API!

Now let's fetch this JSON data from our API and display it in our HTML page. First navigate to the root of your app and then open the `public/index.html` directory. Find the section below and add this `<p>` element with an id of #myData:

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

Now open the `public/index.js` file and replace it's contents to use this function. This async function will fetch the JSON data from our API, the `get /api` function we provisioned earlier and then append it to the DOM.

```js
// public/index.js
(async function main() {
  // Get a reference to the element to display our data in
  let display = document.getElementById('myData')
  // Declare a message variable to be set later
  let message
  try {
    // Attempt to fetch data from our API
    let data = await (await fetch('/api')).json()
    console.log(data)
    message = data.message
  } catch (err) {
    // If there was an error catch it and display the message
    console.log(err)
    message = err.message
  }
  // If we created the display element and added the ID correctly
  if (display) {
    // Show the message
    display.innerHTML = message
  }
}())
```

Now you can see the data from our `get /api` HTTP Function is being requested by our frontend code via fetch then displayed in our HTML page.

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

You now have a good idea on how HTTP functions work within Begin. Your next task is to learn [Begin Data!](https://docs.begin.com/en/http-functions/provisioning)

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
- More about HTTP functions
  - [HTTP functions](https://docs.begin.com/en/http-functions/provisioning)
  - [Architect project layout](https://arc.codes/quickstart/layout)
  - [New at Begin: add and manage routes via manifest file](https://blog.begin.com/new-at-begin-add-and-manage-routes-via-manifest-file-24ced2e65a36)
