## Overview

Scheduled Functions creates stateless functions that run on a schedule. You can create rules that self-trigger on an automated schedule in your app using cron or rate expressions. 

Oh, and provisioning new Scheduled Functions is a cinch!

## Provisioning new Scheduled Functions

To provision a new Scheduled Function, in the root of your project, open your app's Architect project manifest file (usually `.arc`):

1. Find your project's `@scheduled` pragma
    - If you don't already have one, just add `@scheduled`
2. On a new line, enter the scheduled name you wish to create along with the `rate` or `cron`.
For example: `cleanup rate(1 day)`, or `tweet rate(1 hour)`
3. Start the local dev environment to generate some boilerplate Scheduled Function handlers: `npm start`
    - New function handlers will now appear in `src/scheduled/` (e.g. `src/scheduled/cleanup` & `src/scheduled/tweet`)
4. Commit and push your changes to your repo

Here's what a basic Architect project manifest looks like with the above two **Scheduled Functions** specified:

```
@app
your-app-name

@scheduled
cleanup rate(1 day)
tweet rate(1 hour)
```
Scheduled functions can be configured with either `rate` or `cron`.

> ⚠️ Rate expressions are simpler to define but don't offer the fine-grained schedule control that cron expressions support. For example, with a cron expression, you can define a rule that triggers at a specified time on a certain day of each week or month. In contrast, rate expressions trigger a rule at a regular rate, such as once every hour or once every day.


After specifying new Scheduled Functions in your Architect project manifest and pushing your changes to your repo, the following things happen automatically:

- New infrastructure is provisioned to make the event(s) publicly available – this may take a few moments to spin up
- A build is kicked off, and, if green, is deployed to `staging` (but not `production`, of course)

That's all there is to it! Now let's take a closer look at the capabilities of Scheduled Functions, and how they work.

> To learn more about `rates` & `cron` follow this link to the [AWS Scheduled Events Docs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html)

## The basics

Each Scheduled Function (@scheduled pragma) can create rules that self-trigger on an automated schedule using cron or rate expressions. All scheduled events use UTC time zone and the minimum precision for schedules is 1 minute.

### Scheduled handler

Once this handler is created, we can use it to trigger an HTTP Function with our business logic to execute on a schedule.
