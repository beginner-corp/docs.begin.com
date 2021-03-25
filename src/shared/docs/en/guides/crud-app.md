> ⏱ This guide takes less than 10 minutes.

## **Hello there, Beginner!**

This guide is meant to show you around Begin's [CRUD app](https://github.com/begin-examples/node-crud) which demonstrates how to build a simple todo app using Begin Data.

> ✋🏽 You will need [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [node.js](https://nodejs.org/en/download/) and a [GitHub account](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github) to follow along.

---

## Create your CRUD app
<br/>

First click the **Deploy to Begin** button below

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-crud)
<br/>
<br/>

Next name your app and click the "Create..." button to have Begin create a new app and GitHub repo for it.

![Name your Begin app and repo](/_static/screens/shared/begin-repo-name.jpg)
<br/>
<br/>
<br/>

**Check out your apps' activity feed!**

Now click the **Staging** link in the upper left corner to see your app running in your staging environment.

![Begin Activity view](/_static/screens/shared/begin-activity.jpg)
<br/>
<br/>
<br/>

You should see something like the image below:
![CRUD Starter](/_static/screens/shared/begin-crud.jpg)
<br/>
<br/>
<br/>

**Way to go!**

Now go back to Begin and follow the prompts on the intro cards to see the system in action.
> 💡 Learn more about [CI/CD environments](https://docs.begin.com/en/getting-started/builds-deploys)

---

## Project structure

If you followed the intro cards in the activity view you are ready to review your project's structure on your local machine.
<br/>

```bash
.
├── public/
│   ├── 404.html
│   └── index.html
└── todos/
    ├── create/
    │   └── index.js
    ├── delete/
    │   └── index.js
    ├── read/
    │   └── index.js
    └── update/
        └── index.js
```

Let's go over each of the directories in the project.

### `public/`

The `public` directory is where we serve our [static assets](https://docs.begin.com/en/static-assets/working-with-static-assets) from.
For this project the file to look at is `/public/index.html`.


> 📝 Look for the `<form>` tags and inspect their `action` attribute to see what HTTP Function they make requests to.

### `todos/`

This folder is where we keep HTTP Functions for the apps CRUD actions.

### `todos/create/`
#### **C**reate

`POST` requests to the `/todos` route are processed by the handler function inside `index.js` in this folder.
This handler creates todos by storing form data posted to it with Begin Data.

### `todos/read/`
#### **R**ead

`GET` requests to the `/todos` route are processed by the handler function inside `index.js` in this folder.
This handler gets all the stored todos from Begin Data.

### `todos/update/`
#### **U**pdate

`POST` requests to the `/todos/:id` route are processed by the handler function inside `index.js` in this folder.
This handler updates the todo with the same `id` as the one passed in from the URL parameter.

### `todos/delete/`
#### **D**elete

`POST` requests to the `/todos/delete` route are processed by the handler function inside `index.js` in this folder.
This handler deletes a todo with the same `id` as the one passed in from the form data.


## Congratulations!

You've just built a CRUD todo app and API, and seen how Begin Data can persist data for your application's storage needs.

Now go [show it off](https://twitter.com/intent/tweet?text=Hey%2C%20check%20out%20my%20new%20Begin-Crud%20app%21%20%28I%20made%20it%20with%20@Begin%29%20PASTE_YOUR_URL_HERE) – people need to see this thing!

---

## Learn more about DynamoDB

[AWS DynamoDB](https://aws.amazon.com/dynamodb/) is a fully managed, highly durable, non-relational key value and document database for applications that need performance at any scale.

[Learn more about DynamoDB here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)!

---

## Additional resources

- Expand the capabilities of your app:
  - [Creating new routes](/en/functions/creating-new-functions)
  - [Add Begin Data](/en/data/begin-data/)
- [Begin reference docs](/en/getting-started/introduction)
- Get help:
  - [Begin community](https://github.com/smallwins/begin-community/discussions)
  - [Issue tracker](https://github.com/smallwins/begin-issues/issues)
- More about Begin Data
  - [Begin Data Official docs](/en/data/begin-data/)
  - [Begin Data GitHub](https://github.com/smallwins/begin-data)
  - [Arc.codes/tables](https://arc.codes/primitives/tables)
