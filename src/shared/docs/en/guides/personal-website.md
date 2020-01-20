# Begin Personal Site

**Hello there BEGINNERS!**

You're here because you want to make a fast, beautiful, custom personal site running on Begin. This guide demonstrates server(less)-side rendering, shared components, and static assets. 

**Let's get Started!**


## Deploy your own

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-personal-website)

Deploy your own clone of this app to Begin!


## Create a Begin account

To create a Begin account, simply click the `Login` button on the [Begin home page](https://begin.com), authorize it with GitHub, and pick a username. That's it!

**Clicking the `Deploy to Begin` button above will do the same.**

## Getting started

Once authenticated, you will then be taken to the screen below. Click the `Create New App` button on the top right to proceed.

![Begin create new app](/_static/screens/begin-create-new-app.png)

Now all we have to do is choose the `Personal Website` option displayed in the image below.

![Begin new app selector](/_static/screens/begin-app-selection-2.png)

Then name your app and repo, and Begin will spin up your new project repository under `github.com/{your GH username}/{your repo name}`, and populate it with a fully functional Begin app.

> By default your Begin app repo is created as a public GitHub repo; it can be set to private by granting Begin additional permissions via in the `Settings` screen found in the left nav of your Begin app.

![Begin name repo](/_static/screens/begin-repo-name.png)

## Begin Activity

**Welcome to the backend user interface of your Begin app!**

Here you'll be able to view your app build & deploy in real-time. 

![Begin activity](/_static/screens/begin-activity.png)

## Project setup

Start the local dev server: 

```
npm start

```

Lint your code: 

```
npm run lint 

```

Run your tests: 

```
npm t

```


## Deploying your site

- Run Begin's build steps locally:
  - Lint your code: `npm run lint`
  - Run your tests: `npm t`
- Deploy to `staging`
  - Just commit and `git push` to `master`!
- Deploy to `production`:
  - Use the `Deploy to production` button in Begin, or
  - Bump your [npm version](https://docs.npmjs.com/cli/version): `npm version [patch|minor|major] && git push origin`
  - Cut your own git tag: `git tag -a 1.0.0 -m "1.0, here we come" && git push origin 1.0.0`


## Additional resources

- [Begin reference docs](https://docs.begin.com)
- [Quickstart](https://docs.begin.com/en/guides/quickstart/) - basics on working locally, project structure, deploying, and accessing your Begin app
- Expand the capabilities of your app:
  - [Creating new routes](https://docs.begin.com/en/functions/creating-new-functions) - basics on expanding the capabilities of your app
  - [Add Begin Data](https://docs.begin.com/en/data/begin-data/)
- Get help:
- [Begin community](https://spectrum.chat/begin)
- [Issue tracker](https://github.com/smallwins/begin-issues/issues)

---

> _We all can't wait to see what you build with [Begin](https://begin.com)!_