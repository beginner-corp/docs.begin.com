## Why am I getting `ENOSPC: no space left on device, write` when I try and deploy my app?

There's a [cap on disk space](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html#function-configuration-deployment-and-execution) because we use a Lambda to build, test, and deploy your app from the Lambda's /tmp directory. That directory has a hard cap of 512mb. We realize this conflicts with some common stacks today, and we're actively working to solve this.

Anything in your project's package.json dependencies and devDependencies will be installed while building and deploying. Examine your project's dependencies and prune the unnecessary ones, and consider lighter-weight alternatives.

We have explored techniques that involve a sibling repo that builds into a main Begin/Architect project. Another option is two projects, one for the front end and one for the API server. This approach may not work for your project, depending on the bulk of where the dependencies are located.

We wish we had better news. We know that this causes a problem for all kinds of projects, and we want to solve it ASAP for Begin users.

## How do I fix the `Error: Port 5000 is already in use, cannot start Sandbox` error?

Starting with macOS Monterey, port 5000 is already in use. This is the port that the Sandbox uses to provide database emulation. If you are running into this issue, you just need to set the ARC_TABLES_PORT environment variable to a different port number. For example:

```bash
export ARC_TABLES_PORT=7001
```

We plan to address [this issue](https://github.com/architect/architect/issues/1261) in a future release.

## Why do I get `"SyntaxError: Unexpected token '.'"` when I use [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)?

👇 Keep reading

## Why do I get `"SyntaxError: Unexpected token '?'"` when I use [nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)?

By default Begin uses the nodejs12.x runtime on AWS. Node.js 12 does not support optional chaining or nullish coalescing. You will want to specify in your projects `app.arc` file or your functions `config.arc` file that you want to use the Node.js 14 runtime.

```arc
@aws
runtime nodejs14.x
```

An upcoming release of Begin will make Node.js 14 the default runtime.
