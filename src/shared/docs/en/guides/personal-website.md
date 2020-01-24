![Begin Personal Site](/_static/screens/begin-personal-site.png)

**Hello there BEGINNERS!**

You're here because you want to make a fast, beautiful, custom personal site running on Begin. This guide demonstrates server(less)-side rendering, shared components, and static assets.

**Let's get Started!**

![Begin Personal Example](/_static/screens/begin-personal.gif)
*****

## **Deploy your own**

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-personal-website)

Deploy your own clone of this app to Begin!

## **Create a Begin account**

To create a Begin account, simply click the `Login` button on the [Begin home page](https://begin.com), authorize it with GitHub, and pick a username. That's it!

Clicking the `Deploy to Begin` button above will do the same.

![Begin Authenticate](/_static/screens/begin-authenticate.png)
*****
## **Getting started**

### **Create New App**
Once authenticated, you will then be taken to the screen below. Click the `Create New App` button on the top right to proceed.

![Begin create new app](/_static/screens/begin-create-new-app.gif)

*****
### **Choose Your Starter**
Now all we have to do is choose the `Personal Website` option displayed in the image below.

![Begin new app selector](/_static/screens/begin-app-selection-2.png)

*****
### **Name your app and repo**
Begin will spin up your new project repository under `github.com/{your GH username}/{your repo name}`, and populate it with a fully functional Begin app.

> By default your Begin app repo is created as a public GitHub repo; it can be set to private by granting Begin additional permissions via in the `Settings` screen found in the left nav of your Begin app.

![Begin name repo](/_static/screens/begin-repo-name.png)
*****

## **Begin Activity**

Welcome to the backend user interface of your Begin app! Here you'll be able to watch your app build & deploy in real-time. 

![Begin activity](/_static/screens/begin-activity.jpg)

## **Project setup**

We should get this project setup in our local environments. Begin Activity provides links to your new repo right here on your dashboard. Head on over and `git clone` your project to your local machine.

![Begin activity](/_static/screens/begin-activity-2.png)

Install dependencies: 

```
npm install

```
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
## **Project Structure**

Now that your app is live in staging, a brief word about how the `Begin Personal  Website` starter is structured so you'll know your way around.

Begin applications are comprised of many small, fast, individually executing cloud functions (or Functions, for short). Let's take a quick look at the source tree of a basic Begin app:

```bash
.
├── public/
├── src/
│   ├── http/
│   │   └── get-index/
│   └── views/
```
Your app's many small, fast, isolated Functions are organized in your project under `src/`.

Each HTTP Function directory services a handler for a publicly available HTTP route (e.g. `src/http/get-hello-world` services `GET /hello/world`).

### **Host static assets with `public/`**

The `public` directory is a great place to add (compiled) JS and CSS, images, gifs, or any other files you want to make publicly accessible in your app.

Each time your app deploys, the contents of this folder will automatically be published to S3 and Begin's CDN.

### **Use caution!**

The full contents of this folder will be copied with each deploy, overwriting any existing files with the same name.

## **Share frontend code with `src/views`**

By default, the contents of `src/views` gets copied into each of your project's `@http` `GET` functions (at `node_modules/@architect/views` for Node, or `vendor/views` for Ruby and Python) whenever you run `npx sandbox`.

This means the modules in this folder can be used by any `@http` `GET` function in your app.

For example, here's how you'd require `src/views/layout.js`:

```javascript
var layout = require('@architect/views/layout')
```


### **How is this different from `src/shared`?**

When we looked at how people were using `src/shared`, we saw that people realized it was an easy way to share frontend components. Which is true! But we felt we could make it more explicit while also not bloating every function when the workflow desired was specifically for `@http` `GET`s.


### **Use caution!**

Everything in `src/views` will be copied into all of your project's `@http` `GET` HTTP functions, which has the potential to bloat your application.

Remember: you want to keep your functions sub-5MB for optimal performance.


> Learn more about [Begin app project structure](/en/getting-started/project-structure/).


## **Deploying your site**

- Run Begin's build steps locally:
  - Lint your code: `npm run lint`
  - Run your tests: `npm t`
- Deploy to `staging`
  - Just commit and `git push` to `master`!
- Deploy to `production`:
  - Use the `Deploy to production` button in Begin, or
  - Bump your [npm version](https://docs.npmjs.com/cli/version): `npm version [patch|minor|major] && git push origin`
  - Cut your own git tag: `git tag -a 1.0.0 -m "1.0, here we come" && git push origin 1.0.0`


## **Additional resources**

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