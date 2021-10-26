> ⏱ This tutorial is an introductory walkthrough of creating a React app on Begin. It should take less than 15 minutes.

## **Hello there, Beginner!**

This tutorial uses the [Create React App](https://github.com/facebook/create-react-app) starter app, extended by an example API endpoint. You'll have all the capabilities of React for building beautiful user interfaces, combined with the power, speed, and security of cloud functions and serverless data storage.

> ✋🏽 You will need [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [node.js](https://nodejs.org/en/download/) and a [GitHub account](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github) to follow along.

## Create your new React app

First, click the **Deploy to Begin** button below. This starts the process of authorizing Begin with your GitHub account. (You may be prompted to log into GitHub, and/or be asked to create a Begin username.)

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-create-react-app)


### Name your app & repo

You'll then be prompted to name your new app and repository – this is optional, feel free to use the default app and repo name if you like!

> Note: your Begin app name and repository name cannot be changed later.

![Name your Begin app and repo](/_static/screens/shared/begin-repo-name.jpg)

Once you've clicked the `Create...` button, Begin will spin up your new project on GitHub (under `github.com/{your GH username}/{your repo name}`).

> By default your Begin app repo is created as a public GitHub repo; it can be set to private by granting Begin additional permissions from this screen (or later from the `Settings` screen found in the left nav of your Begin app).

---

## Project structure

Now that your app is live on `staging` and running locally, let's take a quick look into how the project itself is structured so you'll know your way around. Here are the key folders and files in the source tree of your personal website:

```bash
.
├── api/
│    └── index.js
├── build/
├── public/
├── src/
│    └── App.js
└── test/
```

Let's go over each of these directories and files and how you may use them:

### `api/`

The `api` folder is where the cloud function that handles `GET` requests to `/api` lives. When we call our `api` from our app it will execute the handler function in the `index.js` file.

Some Begin apps are inert static web sites – but not this one. Your React app utilizes this built-in small, fast, individually executing cloud function that handles HTTP API requests and responses. (We call those HTTP functions, for short.)

In the next section we will go more in-depth about how to provision HTTP functions in your React app.

> 💡 **Learn more!** Head here to dig deeper into [HTTP functions in Begin apps](/en/http-functions/provisioning/).


### `build/`

The `build` folder is where your React app will build into (and be served from locally). Since this folder contains build artifacts, it isn't checked into git and shouldn't be directly modified. Instead, let your app re-build its contents.

Each time your app is deployed by Begin, the build artifacts in `build` will automatically be published to your app's static asset bucket (on [S3](https://aws.amazon.com/s3/)) as well as Begin's CDN.


### `public/`

The `public` directory is for [static assets](https://docs.begin.com/en/static-assets/working-with-static-assets).

### `src/App.js`

Along with the other boilerplate React app files (`src/App.css`, `src/App-test.js`, etc.), `src/App.js` serves as the primary entry point for your React app. This is a great place to start tinkering with your app.

---

## Using API endpoints

Now for the fun part! Let's go over how HTTP functions work.

The text in the red box below is actually being fetched an example API endpoint, handled by `api/index.js`.

![React API](/_static/screens/guides/create-react-app/react-api.jpg)

The output of this HTTP function can be called by fetching `GET /api`, and subsequently used by any component within your React app:

```js
// api/index.js

exports.handler = async function http (req) {
  console.log('Begin API called')
  return {
    statusCode: 200,
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

Now let's navigate to `src/App.js` to see how this HTTP function was being implemented into your app. As you can see below, `GET /api/` is fetched via async function wrapped in a React hook (`useEffect`).

```js
// src/App.js

const App = () => {
  const [message, setMessage] = useState('...loading')

  useEffect(() => {
    async function fetchData () {
      try {
        let data = await (await fetch('/api')).json()
        setMessage(data.message)
      } catch (err) {
        setMessage(err.message)
      }
    }
    fetchData()
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message}</p>
        <p>Change me!</p>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
```

This is just one small example of how using a live API endpoint powered by an HTTP function can make your React app dynamic. Just think of all the things you can build this way!

---

## Deploy your site

Add and commit your files then push to main to kick off a build that will deploy to `staging`.

```bash
git add -A
git commit -am 'Just customizing my Begin site!'
git push origin main
```

Head on back to Begin and open your `staging` URL once your build is complete. Looking good? Excellent!

Now let's deploy to `production`: click the **Deploy to production** button in the upper left, pick a version, leave an optional message summarizing your changes, and **Ship it**!

When your next build is done, click the `production` link in the upper left corner to see the latest release of your app!

> **✨Tip:** You can also deploy to production from your terminal by bumping your [npm version](https://docs.npmjs.com/cli/version) (`npm version [patch|minor|major] && git push origin`) or by cutting a git tag (`git tag -a 1.0.0 -m "1.0, here we come" && git push origin --tags`)

---

## Congratulations!

You've now got a shiny new React app hosted on Begin – nice work.

Now go [show it off](https://twitter.com/intent/tweet?text=Hey%2C%20check%20out%20my%20new%20React%20app%21%20%28I%20made%20it%20with%20@Begin%29%20PASTE_YOUR_URL_HERE) – people need to see this thing!

---

## Additional resources

- Expand the capabilities of your app:
  - [Creating new routes](/en/functions/creating-new-functions)
  - [Add Begin Data](/en/data/begin-data/)
- [Begin reference docs](/en/getting-started/introduction)
- Get help:
  - [Begin community](https://github.com/smallwins/begin-community/discussions)
  - [Issue tracker](https://github.com/smallwins/begin-issues/issues)
- More about React:
  - [React home](https://reactjs.org/)
  - [React docs](https://reactjs.org/docs/getting-started.html)
  - [CRA Getting Started](https://create-react-app.dev/docs/getting-started/)
