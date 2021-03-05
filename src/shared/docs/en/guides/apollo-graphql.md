> ⏱ This guide take less than 5 minutes.


## **Hello there, Beginner!**

This guide walks you through getting started with Begin's [Apollo example app](https://github.com/begin-examples/node-apoll) which implements a minimal [Apollo](https://www.apollographql.com/docs/) based [GraphQL](https://graphql.org/learn/) API.

> ✋🏽 You will need [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [node.js](https://nodejs.org/en/download/) and a [GitHub account](https://help.github.com/en/github/getting-started-with-github/signing-up-for-github) to follow along.


---

## Create your Apollo app
<br/>

First click the **Deploy to Begin** button below


[![Deploy to Begin](https://static.begin.com/deploy-to-begin.svg)](https://begin.com/apps/create?template=https://github.com/begin-examples/node-apollo)
<br/>
<br/>

Next name your app and click the "Create..." button to have Begin create a new app and GitHub repo for it.

![Name your Begin app and repo](/_static/screens/shared/begin-repo-name.jpg)
<br/>
<br/>
<br/>

Check out your apps' activity feed!

Now click the **Staging** link in the upper left corner to see your app running in your staging environment.

![Begin Activity view](/_static/screens/shared/begin-activity.jpg)
<br/>
<br/>
<br/>

You should see something like the image below.

![Apollo](/_static/screens/guides/apollo-graphql/apollo-screen.jpg)
<br/>
<br/>
<br/>

**Way to go!**

Now follow the prompts on the intro cards to get acquainted with Begin.
> 💡 Learn more about [CI/CD environments](https://docs.begin.com/en/getting-started/builds-deploys)

---

## Project structure

If you followed the intro cards in the activity view you are ready to review your project's structure on your local machine.
<br/>

```bash
.
├── graphql/
│   └── index.js/
├── public/
│   ├── 404.html
│   └── index.html
└── package.json
```

### `graphql/`

This directory contains a handler function for the GraphQL API.

Take a peek at `/graphql/index.js`.

```js
// /graphql/index.js

let arc = require('@architect/functions')
let {ApolloServer, gql} = require('apollo-server-lambda')

// Construct a schema, using GraphQL schema language
let typeDefs = gql`
  type Query {
    hello: String
  }
`
// Provide resolver functions for your schema fields
let resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

let server = new ApolloServer({typeDefs, resolvers})
let handler = server.createHandler()

exports.handler = function(event, context, callback) {
  let body = arc.http.helpers.bodyParser(event)
  // Body is now parsed, re-encode to JSON for Apollo
  event.body = JSON.stringify(body)
  handler(event, context, callback)
}
```

The handler code above shows how to define type definitions and query resolvers for a GraphQL API.
For more information check out: [How to build a schema with Apollo](https://www.apollographql.com/docs/tutorial/schema/)

### `public/`

The `public` directory is for [static assets](https://docs.begin.com/en/static-assets/working-with-static-assets).

Give `public/index.html` a gander

```js
// public/index.html

 <!-- Example GraphQL query -->
 // Fetch data graph layer
  <script type=module>
    (async function() {
      let query = `{hello}`
      let result = await fetch('/graphql', {
        method: 'post',
        body: JSON.stringify({query}),
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
        }
      })
      let json = await result.json()
      console.log(json)

      // Append results to div element
      let code = document.getElementById('code')
      code.innerHTML = JSON.stringify(json, null, 2)
    })()
  </script>
```
When the page loads the code above uses fetch to `post` to the GraphQL API then display the results.

> 💡 **Learn more!** about [HTTP functions in Begin apps](/en/http-functions/provisioning/).

## Congratulations!

You've now got a shiny new Apollo GraphQL app hosted on Begin – nice work.

---

## Additional resources

- Expand the capabilities of your app:
  - [Creating new routes](/en/functions/creating-new-functions)
  - [Add Begin Data](/en/data/begin-data/)
- [Begin reference docs](/en/getting-started/introduction)
- Get help:
  - [Begin community](https://github.com/smallwins/begin-community/discussions)
  - [Issue tracker](https://github.com/smallwins/begin-issues/issues)

- More about Apollo
  - [Apollo home](https://www.apollographql.com/)
  - [Apollo docs](https://www.apollographql.com/docs/)
  - [LevelUpTuts - What Is Apollo?](https://www.youtube.com/watch?v=mSzUb7f47qk)

- More about GraphQL
  - [GraphQL: The Documentary](https://www.youtube.com/watch?v=783ccP__No8&t=140s)
  - [GraphQL home](https://graphql.org/)
  - [GraphQL docs](https://graphql.org/learn/)
  - [GraphQL Playground](https://github.com/prisma-labs/graphql-playground)
