A solid platform is the foundation of a durable application, but tests are essential!

Begin apps come with some boilerplate tests in the `test` directory, with the test script specified in `package.json`:

```js
{
  "scripts": {
    "test": "NODE_ENV=testing tape test/*-test.js | tap-spec"
  }
}
```

Tests run via `npm test`.

While **you can use any test runner and reporter combo you want**, we recommend the TAP family for testing. Test suites that require their runners to inject globals can create some very difficult to debug situations.

> ⚠️ Begin requires `NODE_ENV=testing` to be present in your `npm test` scripts, regardless of the test framework you're using.
