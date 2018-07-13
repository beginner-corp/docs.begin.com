## Overview

Begin isn't just responsible for provisioning and orchestrating your app's serverless infrastructure, it's also a fully integrated CI/CD build pipeline optimized for serverless architecture.

Begin builds run entirely in cloud functions, so they spin up fast and run in parallel as quickly as you can push changes.


## Build pipeline

Begin offers three hosted environments out of the box: `testing`, `staging`, and `production`. (Of course, Begin also supports full [local development](/en/getting-started/quickstart/#working-locally).)

Within these environments, Begin follows a fairly traditional CI/CD build pipeline:
- `testing` - Commits to `master` kick off CI; green builds deploy to `staging`
- `staging` - Runs latest green build from `master`; clicking the `Deploy to Production` button in the left nav in Begin (or cutting a git tag) deploys to `production`
- `production` - Runs the latest `production` release


## Environment variables

Your `testing`, `staging`, and `production` environments have variables configurable in Begin.

To modify your environment variables, open Begin and open `Environments` in the left nav.

Configured variables are available to all routes within each environment at runtime.

> Note: keys can only contain upper case alphanumeric characters and underscores (`[A-Z0-9_]`), and must start with a letter. Values are limited to 255 characters.
