Hello, and welcome! We can't wait to share everything you need to know about Begin.


## What is Begin?

Begin is a **cloud function continuous deployment platform**.

More specifically: Begin orchestrates the provisioning and management of a wide range of next-generation AWS cloud infrastructure.

Once connected to your codebase, Begin automatically takes care of CI and deployment so you can focus on your product – not on infra, tooling, or scaling.


### Why build with Begin?

Begin enables you to take full advantage of AWS's next-gen cloud infra without the hassle and setup. Think: *serverless stack on easy mode*.

Some key properties of apps built with Begin:

- **Super fast CI, instantaneous deployment**: go from commit to green build to running code in seconds
- **Nearly infinitely scalable**: native AWS Lambda-based compute means never having to pre-provision infra or spend time on capacity planning
- **Highly debuggable**: per route isolation reduces the time required to find problems and ship fixes
- **Staging isolation**: baked-in fully isolated staging environment is automatically set up right alongside production
- **Cost-effective**: pay for what you use – not for what you think you may need


## What Begin does & doesn't do

### What Begin does

- Provision and orchestrate the next-gen cloud infrastructure needed to stand up a nearly infinitely scalable web application or API
- Provide fully isolated staging and production environments
- Manage CI for multiple environments
- Distribute static assets
- Deploy builds to `staging` (automatically, if green) and `production` (on-demand)
- Enable full offline and local development workflows


### What can you build with Begin?

If you can build it with Node and a database, you can build it with Begin. Here are just a few ideas:

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
- Operate physical infrastructure – Begin runs on the same AWS infrastructure as apps built on Begin – and increasingly much of the world's software
- Long-running processes – Begin relies on fast-executing, highly scalable next-gen cloud services; applications that require extreme compute or long-running connections are probably still best suited to non-serverless infrastructure


### What shouldn't you build with Begin?

- Streaming video services – at some point in the future Begin might be able to accommodate this kind of use case, but for now processes and connections terminate at 5 minutes
- MMOs – while the scale required to operate an MMO is entirely possible, again, Begin's compute model is not presently designed for long-lived connections
- ML training, blockchain computation – if it can compute in 5 minutes or less on reasonably fast iron, Begin can do it – and cost effectively, too. But most ML and blockchain applications we've seen require more than a few minutes' worth of cycles to complete processes
- Compiled mobile and desktop apps – if you need CI and build distribution for your compiled mobile or desktop app, we suggest services like [BuddyBuild](https://www.buddybuild.com/), [CircleCI](https://circleci.com/), and [TestFlight](https://developer.apple.com/testflight/). But if you need to build your backend and APIs for your mobile app, Begin is here for that!


## Background & open source governance

Begin, uh, began as a cloud infrastructure framework built to help manage the immense complexities associated with orchestrating software releases to hundreds of Lambdas, API Gateways, and other AWS serverless services.

That project became known as [Architect](https://arc.codes), which we (Small Wins) partnered with and donated to the [JS Foundation](https://js.foundation/) in 2017 under an open governance model and Apache 2 license.

Architect and Small Wins are committed to building open, inclusive open source communities. If you like Begin, we'd love for you to participate in Architect! (We kindly ask you agree to the [CLA](https://js.foundation/cla), and [JSF](https://js.foundation/community/code-of-conduct) and [Small Wins](https://github.com/smallwins/policy/blob/master/begin-community-code-of-conduct.md) Codes of Conduct.

Apps built with Begin are fully compatible with Architect. You can eject your apps from Begin at any time and run them on your own AWS infra, should you want to – and we're committed to making that easy to do.
