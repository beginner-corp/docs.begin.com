## Overview

Set up recurring tasks to run on an interval with **Begin scheduled functions**.

Scheduled functions enable you to do things like back up your data once a week, or generate a monthly report based on user interactions. They are the serverless equivalent of a cron job.


## Provisioning new scheduled functions

The `app.arc` file in the root of your project is where you define all of your app's infrastructure as code. Add an entry to the `@scheduled` section to provision a new scheduled function.

```arc
@scheduled
data-backup rate(1 week)
```
Above is an example of a scheduled function `data-backup` entry with a rate specified `rate(1 week)`.

> ⚠️ Scheduled function names are lowercase alphanumeric and can contain dashes. They must declare a `rate` with a number, and an time period with the appropriate singular / plural form, e.g. `rate(1 day)`, `rate(2 weeks)`
>
> <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html#RateExpressions" target="_blank" rel="noopener">Read more about the `rate` syntax here</a>


Now generate a scheduled function handler by running the local sandbox server with `npm start`. The sandbox server generates scheduled function handlers in `src/scheduled`.

Pushing the changes made to your app's `app.arc` file initiates a build that provisions your new scheduled function infrastructure when all specified build steps succeed.

Verify the new scheduled function provisioning on <a href="https://begin.com/forward/scheduled" target="_blank" rel="noopener">your app's scheduled functions page</a>.

This scheduled function is now available in your app's staging environment; the next production deploy provisions your app's production environment.

Congratulations! You now know how to create scheduled functions.


## Scheduled functions in action

Think of scheduled functions as a job you want to do every so often.

One such job you might want to do is give yourself a daily affirmation. Let's walk through one way to implement this:

1. Add a scheduled function named **affirm** with a rate of **1 day** to your `app.arc` file by adding: `affirm rate(1 day)`
2. Generate a boilerplate handler with `npm start`
3. Edit the file `src/scheduled/affirm/index.js`

```js
// Handler function
exports.handler = async function affirmation(event) {
  console.log('You are good enough, smart enough, and doggone it people like you!')
  return
}
```


## Limits

In the Begin free-tier, scheduled functions are limited in the following ways:

- They can run no more frequently than once every 6 hours
- 30 seconds of execution time

Begin paid-tier apps are not limited in these ways.

Another important thing to note: AWS does not guarantee the exact time of execution. So while you can request a scheduled function runs twice daily, you cannot specify that it run at noon and midnight – it may always run at 2:04PM & 2:04AM, for example.


## Removing scheduled functions

Modify your `app.arc` file to remove scheduled functions from your app. Find the `@scheduled` pragma, then delete the name of the scheduled function you wish to remove.

Push the updated `app.arc` file, and the deleted scheduled functions get removed from `staging`.  Scheduled functions get removed from `production` after the next production deploy.

> ⚠️ Remember to remove the deleted scheduled function's folder from `src/scheduled` as well.
