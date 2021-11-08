## Why am I getting `ENOSPC: no space left on device, write` when I try and deploy my app?

There's a [cap on disk space](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html#function-configuration-deployment-and-execution) because we use a Lambda to build, test, and deploy your app from the Lambda's /tmp directory. That directory has a hard cap of 512mb. We realize this conflicts with some common stacks today, and we're actively working to solve this.

Anything in your project's package.json dependencies and devDependencies will be installed while building and deploying. Examine your project's dependencies and prune the unnecessary ones, and consider lighter-weight alternatives.

We have explored techniques that involve a sibling repo that builds into a main Begin/Architect project. Another option is two projects, one for the front end and one for the API server. This approach may not work for your project, depending on the bulk of where the dependencies are located.

We wish we had better news. We know that this causes a problem for all kinds of projects, and we want to solve it ASAP for Begin users.
