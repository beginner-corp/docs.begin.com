## Overview

Open `Settings` in Begin to view and modify your app's settings and resources, download your data, and eject or delete your app.


## App name

Your configured app name is displayed here.


## Notifications

Begin can fire notifications to the Slack channel of your choosing, notifying members of new builds.

Click the `Add to Slack` button to set up your notification integration.


## AWS resources inventory

Sometimes folks are curious about all the various services Begin provisions under the hood.

The AWS resources inventory details the serverless infra your app is using (including `staging` and `production` links, where available).


## Deleting your app

In the event you want to start over or, sadly, just pack it in, Begin allows you to destroy your app (and all related infra) with the `Delete app` button.

> Note: this is an irreversible action. However, Begin does not destroy your git repo, which you can delete from GitHub.


## Ejecting your app

If you're digging this whole serverless app thing but want to run everything under your own AWS account, no worries, we've got you covered.

Just follow the following steps:

1. Download any application data, settings, env vars, etc. stored in Begin that you may need.

2. Clone your Begin app

```bash
git clone https://github.com/{your GH org/username}/{your app name}.git
```

2. Open the `.arc` file, and add a `@app` namespace (=<10 chars) to the top; for example, add lines 1-2:

```bash
@app
puppyfinder

@html
get /
```

3. Update your `package.json` and `package-lock.json` as appropriate

4. If you haven't already, make sure to go [set up your AWS credentials and env vars (as necessary)](https://arc.codes/quickstart).

5. Run `npx create`

That should get you going on AWS without Begin! Of course, you'll probably want to keep going by adding a domain, setting up a database, and more.

To learn more about [expanding and configuring your exported Architect project](https://arc.codes/).
