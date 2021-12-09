A solid platform is the foundation of a durable application, but tests are essential!

Begin apps come with some boilerplate tests in the `test` directory, with the test script specified in `package.json`:

```js
{
  "scripts": {
    "test": "cross-env NODE_ENV=testing tape 'test/*-test.js' | tap-spec"
  }
}
```

> We use the `cross-env` package and single quote (') around the [glob](https://en.wikipedia.org/wiki/Glob_(programming)) to ensure the test command works on Mac, Linux and Windows environments.

Tests run via `npm test`.

While **you can use any test runner and reporter combo you want**, we recommend the TAP family for testing. Test suites that require their runners to inject globals can create some very difficult to debug situations.

While also not strictly required, we recommend setting your `NODE_ENV` to `testing` in your test script.
