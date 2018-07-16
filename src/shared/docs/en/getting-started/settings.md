## Overview

Open `Settings` in Begin to view and modify 


## App name

Your configured app name is displayed here.

> Note: free-tier app names cannot currently be edited.


## Notifications

Begin can fire notifications to the Slack channel of your choosing, notifying members of new builds. Click the `Add to Slack` button to set up your integration.


## AWS resources inventory

Sometimes folks are curious about all the various services Begin provisions your app under the hood.

The AWS resources inventory details the serverless infra your app is using, including `staging` and `production` links (where available).


## Deleting your app

In the event you want to start over or, sadly, just want to pack it in, Begin allows you to destroy your app (and all related infra) with the `Delete app` button.

> Note: this is an irreversible action, but Begin does not touch your git repo. If you wish to destroy that as well, please delete it from GitHub.


## Ejecting your app

If you're digging this whole serverless thing but want to run it in your own AWS, no worries, we've got you covered.

Just follow the following steps:

1. Clone your Begin app

```bash
git clone git@github.com:{your GH username}/begin-functions-app.git
```

2. Open the `.arc` file, and add a `@app` namespace (<25 chars) to the top; for example, add lines 1-2:

```bash
@app
puppyfinder

@html
get /
```

3. Update your `package.json` and `package-lock.json` as appropriate

4. Run `npx create`

That should get you going! Of course, you'll probably want to keep going by adding a domain, setting up a database, and more.

To learn more about expanding and configuring your exported Architect project, head to [arc.codes](https://arc.codes/).
