
<img src="/_static/begin-logo.svg" style="border:0; display:block; margin:auto; height:70px; textAlign: center;">

Hello there! **Begin is the premier serverless development platform and one of the best ways create modern web-apps & APIs!**

Begin leverages next-gen cloud platform technologies like 
- globally available serverless infrastructure
- SSD-backed databases 
- integrated CDNs 

and manages all your app's needs, like 
- git integration
- CI/CD
- and everything in between!


We can't wait to share everything you need to know about to go deeper with Begin.

> (If you haven't already read the [Quickstart](/en/guides/quickstart), that's a very good place to start.)

First thing's first: let's get set up to work locally.

## Getting set up

Begin works super fast from top to bottom, and you'll be up and running locally in seconds.

Assuming you've already logged in and created your first Begin app (with the default name of `Begin app`), open your terminal and:

1. Clone your app's repo to your local machine:
```bash
git clone https://github.com/{your GH username}/begin-app.git
```

- cd to your Begin project directory:
```bash
cd begin-app
```

- Install npm packages:
```bash
npm install
```

- Start the app locally:
```bash
npm start
```

That's it, you're ready to build!


## Previewing your changes

Changes to your app in your local environment are immediately available without requiring a development server restart.

Your application's business logic exists within 

- [HTTP function directories](/http-functions/provisioning) (e.g. `src/http/get-index`)
- [shared code directories](/share-code/sharing-common-code) `views` & `shared` (e.g. files in `src/shared/` or `src/views/`)

> ✨ Tip: if your local dev server is running when you pull down your new HTTP Function, it will automatically mount your new route and install its dependencies – no restart required!

## Routes and logging

HTTP functions are also how you create routes to other pages within your app using `GET` requests.

![Begin http](/_static/screens/shared/begin-http.jpg)

Inside of your Begin console you'll find a list of your HTTP functions that log information every time the function is invoked. You have access to logs for both `staging` and `production`. The list of things that are logged every time your function is invoked are:

- RequestId
- Duration
- Billed Duration
- Memory Size
- Max Memory Used
- Any `console.log` within the function.

![Begin http](/_static/screens/shared/begin-logs.jpg)

---

How about we start pushing some builds to your new app?
