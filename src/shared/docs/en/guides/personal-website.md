![Begin Personal Site](/_static/screens/begin-personal-site.png)

> ⏱ This guide should require less than 5 minutes

**Hello there Beginners!**

We created this tutorial specifically for people who want to make a fast, beautiful, custom personal site running on Begin. This guide demonstrates server(less)-side rendering, shared components, and static assets.

### **Prerequisites**

You will need a Begin account to follow along with this tutorial. To get started creating your own Begin account, please checkout our [Begin Quickstart Guide](http://begin.com).

**This guide also assumes general familiarity with such things as:**
 - text editors
 - terminal interfaces
 - git
 - basic software development in JS with Node.js 
 
Don't fret if you are not familiar with those things. We have a guide for that too! If you need more information on getting started with basic web development, please checkout out our [Beginner web development guide](http://begin.com).

**Let's get started!**

![Begin Personal Example](/_static/screens/begin-personal-example.jpg)

*****
# **Getting Started**

## Deploy your own

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-personal-website)

To get started, simply click the button above to provision your new app. You will land on the screen below. **Remember**, if you don't already have a Begin account, you will have to create one by following our [Begin Quickstart Guide](http://begin.com).

### **Name your app and repo**
Begin will spin up your new project repository under `github.com/{your GH username}/{your repo name}`, and populate it with a fully functional Begin app.

> By default your Begin app repo is created as a public GitHub repo; it can be set to private by granting Begin additional permissions via in the `Settings` screen found in the left nav of your Begin app.

![Begin Personal Example](/_static/screens/begin-repo-name.jpg)


## **Deploying your app**

Welcome to the backend user interface of your Begin app! We call this `Begin Activity`. Here you'll be able to watch your app build & deploy in real-time. For an overview of your Begin backend, we suggest reading the [Reference docs](https://docs.begin.com/en/getting-started/introduction) to get a more thorough understanding.

![Begin activity](/_static/screens/begin-activity.jpg)

## **Project Setup**

We should get this project set up in our local environments. Begin Activity provides links to your new GitHub repo right here on your dashboard. 

If you'd like, click the `Edit on GitHub` button to push some new code to your project and watch it build in `Begin Activity`.

To get this project up & running on your local machine, head on over to GitHub and `git clone` your project to your computer.

![Begin activity](/_static/screens/begin-activity-2.jpg)

Once you've got your project cloned on your local machine, follow these directions to initialize it and spin up a development server.

**Install dependencies:**

```
npm install

```
Start the local dev server:
```
npm start

```
Now you can view your project at the local-host provided in your terminal!

![Begin activity](/_static/screens/begin-sandbox.jpg)

*****

## **Project Structure**

Now that your app is live in staging, a brief word about how the `Begin Personal  Website` starter is structured so you'll know your way around.

Begin applications are comprised of many small, fast, individually executing cloud functions (or Functions, for short). Let's take a quick look at the source tree of a basic Begin app:

```bash
├── public/
└── src/
    ├── http/
    │   └── get-index/
    └── views/
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

## **Write an HTTP Function**

Each new HTTP Function is assigned a folder in your project under `src/http/`, and this code is eventually deployed to its corresponding cloud function.

To provision a new HTTP Function [open your Begin App](https://begin.com) and open the Functions view in the left nav. Once there, simply:
1. Select the HTTP method for your new route (e.g. `POST`)
2. Enter the path for the route you wish to create (e.g. `/api/:item`)
3. Click `Add Function`

That's it. Now let's take a closer look at the capabilities of HTTP Functions, and how they work.


### **The basics**

Each HTTP Function maps to a logical HTTP route. For example:
- `GET /` is serviced by the HTTP Function in your project at `src/http/get-index`
- `GET /about` is serviced by `src/http/get-about`
- `POST /form` is serviced by `src/http/post-form`
- And so on...

All HTTP Functions begin with `/`, and can include letters, numbers, and slashes, underscores, dashes, and periods, up to 35 characters.

Importantly and uniquely, you can also use URL parameters to build dynamic paths – [more on that below](#using-url-parameters-to-create-dynamic-paths).

After clicking `Add Function`, the following things happen automatically:
- Your new HTTP Function is saved to your Begin app configuration
- New infrastructure is provisioned to make the route publicly available (this may take a moment)
- A basic handler for this route is committed to your project in the `src/http/` folder
- A build is kicked off, and, if green, is deployed to `staging` (but not `production`, of course)

> ✨ Tip: It's possible to have multiple HTTP methods respond from the same path! For example: `GET /contact-us` and `POST /contact-us` is totally valid, as you'd expect.

### **Using URL parameters to create dynamic paths**

It's possible to build dynamic paths using [Express-style URL parameters](http://expressjs.com/en/guide/routing.html#route-parameters), like: `GET /shop/:product`

URL parameters are passed to your route via the `req.params` object. ([Learn more about HTTP requests here.](/en/http-functions/api/#requests))

For example, the route used to serve this page is `GET /:lang/:cat/:doc` ([view source](https://github.com/smallwins/docs.begin.com/blob/master/src/http/get-000lang-000cat-000doc/index.js)).

When a client requests the path `/en/functions/creating-new-functions/`, the HTTP Function handling this route receives a `req` object containing:

```js
{
  params: {
    lang: 'en',
    cat: 'http-functions',
    doc: 'provisioning'
  }
}
```

If we were to navigate to the [Quickstart doc](/en/guides/quickstart), the same HTTP Function would receive a `req` object containing:

```js
{
  params: {
    lang: 'en',
    cat: 'guides',
    doc: 'quickstart'
  }
}
```

You can do a lot with this!

> Note: Slashes still function as path part delimiters within URL params, so `GET /api/:foo` will service `GET /api/hello`, but will not service `GET /api/hello/there`.
> To handle `GET /api/hello/there`, create a second HTTP Function for `GET /api/:foo/:bar`


## **Begin Data**

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