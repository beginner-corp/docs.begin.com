> ⏱ This tutorial should take less than 5 minutes.

## **Hello there, Beginner!**

This tutorial shows you how Begin's [Vue example app](https://github.com/begin-examples/node-vue) uses the [Vue](https://vuejs.org/) front-end framework to talk to a cloud function-based API.

> ✋🏽 You will need [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [node.js](https://nodejs.org/en/download/) and a [GitHub account](https://docs.github.com/en/get-started/signing-up-for-github) to follow along.

---

## Create your Vue app

Click the **Deploy to Begin** button below.

[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-vue)
<br/>
<br/>

Name your app and click the 'Create...' button to have Begin create a new app and GitHub repo.

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
![Vue intro](/_static/screens/guides/vue/vue-intro.jpg)
<br/>
<br/>
<br/>

**Right on!**

Now go back to Begin and follow the prompts on the intro cards to see the system in action.
> 💡 Learn more about [CI/CD environments](https://docs.begin.com/en/getting-started/builds-deploys)

---

## Project structure

If you followed the intro cards in the activity view you are ready to review your project's structure on your local machine.
<br/>


```bash
.
├── api/
│   └── index.js
├── dist/
├── public/
├── src/
│    ├── assets/
│    ├── components/
│    ├── App.vue
│    └── main.js
└── test/
```

Let's go over each of these directories to see how they are used.

### `api/`

This directory contains a handler function for the API.
The handler function defined in `api/index.js` returns a response when HTTP requests are made to `/api`

### `dist/`

This is where Vue puts static assets during compilation.

### `public/`

This directory is where the Vue template for `index.html` is stored.

### `src/`

This directory is where all of the apps' source files are kept.

### `src/App.vue`

This file is where the specific code for the app resides.

Vue uses single file components. This means that the component has template, script and style tags for defining the structure, behavior and styling all in one file.

```js
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld :message="message"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  data: function () {
    return {
      message: 'Loading...'
    }
  },
  components: {
    HelloWorld
  },
  methods:  {
    getData: async function () {
      try {
        let data = await (await fetch('api')).json()
        this.message = data.message
      } catch (err) {
        this.message = err.message
      }
    }
  },
  mounted: function () {
    this.getData()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

Let's go over what we see in this `App.vue` file.

#### `template`
The template tag contains the HTML template that will be used to render the general component with specific state.

#### `script`
The script tag is where the components' behavior is defined.

This `App` component leverages Vue built-in component properties of `name`, `data`, `components`, `methods` and `mounted` to define its behavior.

Let's quickly review what these properties are doing.

#### ***components***
`App.vue` exposes the `HelloWorld` component in the `components` array in order to use it in its template.

#### ***data***
The data property returns an object defining the components default data state. In this case the data object contains a message property with the default text of '...loading'

#### ***methods***
This component defines a `getData` function that makes a `GET` request to the `/api` endpoint when called.

#### ***mounted***
Mounted is called when the component is added to a page in the browser. This component calls its `getData` function when it is added to the page.

> 💡 **Learn more!** [Go here to learn more about using components in Vue](https://v1.vuejs.org/guide/components.html).

### `main.js`
This file is the entry point for Vue. It renders the `App.vue` component into the page.

### `src/test/`

Your Vue project comes built-in with a few boilerplate tests in `/test/example.spec.js`.


> 💡 **Learn more!** Use the [Vue CLI](https://cli.vuejs.org/) to explore other scaffolding for your Vue app.

---


## Congratulations!

You've now got a shiny new Vue app hosted on Begin – nice work.

Now go [show it off](https://twitter.com/intent/tweet?text=Hey%2C%20check%20out%20my%20new%20Vue%20app%21%20%28I%20made%20it%20with%20@Begin%29%20PASTE_YOUR_URL_HERE) – people need to see this thing!

---

<!-- TODO add domains directions -->

## Additional resources

- Expand the capabilities of your app:
  - [Creating new routes](/en/functions/creating-new-functions)
  - [Add Begin Data](/en/data/begin-data/)
- [Begin reference docs](/en/getting-started/introduction)
- Get help:
  - [Begin community](https://github.com/smallwins/begin-community/discussions)
  - [Issue tracker](https://github.com/smallwins/begin-issues/issues)
- More about Vue
    - [Vue docs](https://vuejs.org/)
    - [Vue CLI](https://cli.vuejs.org/)
    - [Vue forum](https://forum.vuejs.org/)
    - [What Is Vue JS?](https://www.youtube.com/watch?v=FtXd_qQJgfI)
    - [Vue JS Crash Course](https://www.youtube.com/watch?v=Wy9q22isx3U)
