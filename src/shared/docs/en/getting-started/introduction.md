Hello, and welcome! We can't wait to share everything you need to know about going deeper Begin.

(If you haven't already read the [Quickstart](/en/guides/quickstart), that's a very good place to start.)


## What is Begin?

**Begin is the ridiculously quick platform for building modern web apps and APIs.**

It leverages next-gen cloud platform technologies, like globally available serverless infra, SSD-backed databases, and CDNs, all based on the best of AWS.

![Begin activity](/_static/screens/begin-activity.jpg)

With Begin, you can create fast, flexible, easily maintainable web applications of all kinds with full databases, sessions, CI, and local, offline development tools — all built right in.

Begin also automatically services your app's entire CI and deployment pipeline, so you can focus on your product and your customers – not on infra, tooling, or scaling.


### Why build with Begin?

Begin enables you to take full advantage of AWS's next-gen cloud infra without the hassle and setup, baking in best practices and key opinions on architecture derived from our team's years of trial, error, and discovery in building cloud function-based software.

Think: *serverless stack on super-easy mode*.

Some key properties of apps built with Begin:

- **Super fast CI, instantaneous deployment**: go from commit to green build to running code in *seconds*. This is not an exaggeration.
- **Nearly infinitely scalable**: native AWS Lambda-based compute means never having to pre-provision infra or spend time on capacity planning. Just add code.
- **Highly debuggable**: per-route isolation reduces the time required to find problems and ship fixes, increasing time spent on delivering value to your customers.
- **Staging isolation**: baked-in fully isolated `staging` environment is automatically set up right alongside `production`. Say goodbye to pushing bad builds.
- **Cost-effective**: pay for increased isolation and for the resources you actually use – not for what you think you may need


## What Begin does & doesn't do

### What Begin does

- Provide the basis for cloud function-based applications, and optional open source framework tooling
- Provision and manage the cloud infrastructure (including compute, SSD-backed databases, and CDNs) needed to stand up a nearly infinitely scalable web application or API
- Provide fully isolated `staging` and `production` environments
- Manage CI for multiple environments
- Distribute static assets
- Deploy builds to `staging` (automatically, if green) and `production` (on-demand)
- Enable full offline and local development workflows


### What can you build with Begin?

If you can build it with Node.js and a database, you can build it with Begin. Here are just a few ideas:

- Fast, easily updated static web sites
- Powerful database-backed web applications
- APIs
- Backends for mobile apps
- Internal tooling
- Microservices supporting other applications
- Tools for data processing
- Slack apps
- Alexa Skills


### What Begin doesn't do

- Store (or cache) your code – your version control system is the source of truth for your code, which is passed to Begin only to build and deploy
- Operate physical infrastructure – Begin apps, like much of the world's high performance, mission critical applications, run on AWS infrastructure
- Long-running processes – Begin relies on fast-executing, highly scalable cloud functions; applications with extreme compute needs or long-running connections are probably still best suited to more old school infrastructure


### What shouldn't you build with Begin?

- Streaming video services – at some point in the future Begin might be able to accommodate this kind of use case, but for now processes and connections terminate at 5 minutes
- MMOs – while the scale required to operate an MMO is entirely possible, again, Begin's compute model is not presently designed for long-lived connections
- ML training, blockchain computation – if it can compute in 5 minutes or less on reasonably fast iron, Begin can do it – and cost effectively, too. But most ML and blockchain applications we've seen require more than a few minutes' worth of cycles to complete processes
- Compiled mobile and desktop apps – if you need CI and build distribution for your compiled mobile or desktop app, we suggest services like [BuddyBuild](https://www.buddybuild.com/), [CircleCI](https://circleci.com/), and [TestFlight](https://developer.apple.com/testflight/). But if you need to build your backend and APIs for your mobile app, Begin is here for that!


## Background & open source governance

Begin started out as a cloud infrastructure framework built to help tame the immense complexities associated with managing releases to hundreds of Lambdas, API Gateways, and other serverless services.

That project became known as [Architect](https://arc.codes), which we (Begin) donated to [OpenJS](https://openjsf.org/) (neé JS Foundation) in 2017 under an open governance model and Apache 2 license.

Architect and Begin are committed to building open, inclusive open source communities. If you like Begin, we'd love for you to participate in Architect! (We kindly ask you agree to the [CLA](https://js.foundation/cla), and [JSF](https://js.foundation/community/code-of-conduct) and [Small Wins, Inc.](https://github.com/smallwins/policy/blob/master/begin-community-code-of-conduct.md) Codes of Conduct.)

Apps built with Begin are fully compatible with Architect. You can eject your apps from Begin at any time and run them on your own AWS infra, should you want to – and we're committed to making that easy to do, as it keeps our interests squarely aligned with those of our customers.
