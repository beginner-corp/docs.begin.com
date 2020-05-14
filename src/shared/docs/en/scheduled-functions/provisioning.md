 ## Overview

Set up recurring tasks to run on an interval with **Begin scheduled functions**.

Scheduled functions enable you to do things like back up your data once a week, or generate a weekly report based on user interactions. They are the serverless equivalent of a cron job.


## Provisioning new scheduled functions

The `.arc` file in the root of your project is where you define all of your app's infrastructure as code. Add an entry to the `@scheduled` section to provision a new scheduled function.


```
@scheduled
data-backup rate(1 day)
```

Above is an example of a scheduled function `data-backup` entry with a rate specified `rate(1 day)`.

> ⚠️ Scheduled function names are lowercase alphanumeric and can contain dashes.

<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html" target="_blank" rel="noopener">Read more about the `rate` syntax here →</a>

Now generate a scheduled function handler by running the local sandbox server with `npm start`. The sandbox server generates scheduled function handlers in `src/scheduled`.

Pushing the changes made to your app's `.arc` file initiates a build that provisions your new scheduled function infrastructure when all specified build steps succeed.

Verify the new scheduled function provisioning on <a href="https://begin.com/forward/scheduled" target="_blank" rel="noopener">your app's scheduled functions page</a>.

This scheduled function is now available in your app's staging environment; the next production deploy provisions your app's production environment.

Congratulations! You now know how to create scheduled functions.


## Scheduled functions in action

Think of scheduled functions as a job you want to do every so often.
One such job you might want to do is back up your data. Let's walk through one way to implement this.

Add a scheduled function named **backup** with a rate of **1 week** to your `.arc` file.

```bash
@scheduled
backup rate(1 week)`
```

Generate a boilerplate handler with `npm start`.
Edit the file `src/scheduled/backup/index.js`.

```javascript
// Begin data
const data = require('@begin/data')

// Handler function
exports.handler = async function scheduled (event) {
  // Page through all the data in a given table
  let pages = await data.page({
    table: 'my-data',
    limit: 100
  })

  // Log out the data for curiousioties sake
  let count = 0
  for await (let page of pages) {
    count = count + 1
    console.log(
      'Page: ', page, '\n',
      'Count: ', count, '\n'
    )
  }
  // Now save a copy wherever you like. S3 etc.
  return
}
```


## Removing scheduled functions

Modify your `.arc` file to remove scheduled functions from your app. Find the `@scheduled` pragma, then delete the name of the scheduled function you wish to remove.

Push the updated `.arc` file, and the deleted scheduled functions get removed from `staging`.  Scheduled functions get removed from `production` after the next production deploy.

> ⚠️ Remember to remove the deleted scheduled function's folder from `src/scheduled` as well.

