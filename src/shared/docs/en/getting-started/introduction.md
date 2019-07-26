Hello there! **Begin is the ridiculously quick platform for building modern web apps and APIs.**

![Begin activity](/_static/screens/begin-activity.jpg)

Begin leverages next-gen cloud platform technologies – like globally available serverless infra, SSD-backed databases, and integrated CDNs – and manages all your app's needs, from git integration, to CI/CD, and everything in between.

We can't wait to share everything you need to know about go deeper with Begin.

(If you haven't already read the [Quickstart](/en/guides/quickstart), that's a very good place to start.)

First thing's first: let's get set up to work locally.


## Getting set up

Begin works super fast from top to bottom, and you'll up and running locally in seconds.

Assuming you've already logged in and created your first Begin app (with the default name of `Begin app`), open your terminal and:

1. Clone your app's repo to your local machine:
```bash
git clone https://github.com/{your GH username}/begin-app.git
```

- cd to your Begin project directory:
```bash
cd begin-app
```

- Install NPM packages:
```bash
npm install
```

- Start the app locally:
```bash
npm start
```

That's it, you're ready to build!


## Previewing your changes

Changes to your app in your local environment are immediately available without requiring a dev server restart.

Your application's business logic exists within your HTTP Function directories (e.g. `src/http/get-index`), and your shared code folders (e.g. files in `src/shared/` or `src/views/`).

Any new HTTP Functions (i.e. routes) that you create in Begin will be automatically committed to your project; run `git pull` to start working locally with them.

> ✨ Tip: if your local dev server is running when you pull down your new HTTP Function, it will automatically mount your new route and install its dependencies – no restart required!

How about we start pushing some builds to your new app?
