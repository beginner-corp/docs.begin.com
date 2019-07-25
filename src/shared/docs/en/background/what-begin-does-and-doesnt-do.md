Begin is the ridiculously quick platform for building modern web apps and APIs. It is super versatile, but has some considerations and limitations that should be acknowledged


## What Begin does

- Provide the basis for cloud function-based applications, and optional open source framework tooling
- Provision and manage the cloud infrastructure (including compute, SSD-backed databases, and CDNs) needed to stand up a nearly infinitely scalable web application or API
- Provide fully isolated `staging` and `production` environments
- Manage CI for multiple environments
- Manage the distribution of static assets via CDN
- Deploy builds to `staging` (automatically, if green) and `production` (on-demand)
- Enable full offline and local development workflows
- Provide collaboration and access control with other teammates
- Send important updates or notifications to your configured services, such as GitHub, Slack, etc.


## What can you build with Begin?

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


## What Begin doesn't do

- Store (or cache) your code – your version control system is the source of truth for your code, which is passed to Begin only to build and deploy
- Operate physical infrastructure – Begin apps, like much of the world's high performance, mission critical applications, run on AWS infrastructure
- Long-running processes – Begin relies on fast-executing, highly scalable cloud functions; applications with extreme compute needs or long-running connections are probably still best suited to more old school infrastructure


## What shouldn't you build with Begin?

- Streaming video services – at some point in the future Begin might be able to accommodate this kind of use case, but for now processes and connections terminate at 5 minutes
- MMOs – while the scale required to operate an MMO is entirely possible, again, Begin's compute model is not presently designed for long-lived connections
- ML training, blockchain computation – if it can compute in 5 minutes or less on reasonably fast iron, Begin can do it – and cost effectively, too. But most ML and blockchain applications we've seen require more than a few minutes' worth of cycles to complete processes
- Compiled mobile and desktop apps – if you need CI and build distribution for your compiled mobile or desktop app, we suggest services like [BuddyBuild](https://www.buddybuild.com/), [CircleCI](https://circleci.com/), and [TestFlight](https://developer.apple.com/testflight/). But if you need to build your backend and APIs for your mobile app, Begin is here for that!