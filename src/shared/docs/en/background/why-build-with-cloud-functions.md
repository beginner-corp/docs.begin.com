> This document describes reasons to build cloud function-based applications (or CFAs), with considerations and added context on how they differ from other kinds of software.

Traditionally, most apps demand three key things of their maintainers:

1. Managing the codebase
2. Managing the server infrastructure that runs the codebase
3. Managing the plumbing that ties the code and infra together

Begin offers a powerful new approach to app development: **building applications native to cloud functions**.

A batteries-included cloud function-native app means zero config, zero setup, and pre-built plumbing (CI/CD, Git integration, dedicated staging environment, etc.), that runs indefinitely without ever needing maintenance, patches, or security fixes.

It also means your app deploys instantly, you pay only for what you use, and you can finally scale your app from a simple prototype to a massive success without ever having to change your cloud infra.


## So, here's why build with cloud functions
> ✨Let's learn your new superpowers

Unlike server-metaphor based technologies (servers, VMs, instances, Docker / Kubernetes, etc. – which we'll just call "servers" here), CFAs:
- **Deploy new code instantaneously** - a single function deploys globally in seconds, and a large app in minutes. This means orders of magnitude tighter iteration cycles and faster fixes, which in turn means far greater customer value.
- **Scale up to meet increased demand instantly** - cloud functions are completely elastic, and instantly create additional instantiations of themselves as demand grows. Never worry about the app going down again.
- **Scale and grow automatically** - time spent capacity planning is time wasted
- **Are more secure** - cloud functions adhere to least privilege at the lowest levels, each being locked down and secured from the filesystem all the way up through the other cloud services it can communicate with
- **Do not keep ports or processes open** - with nothing to scan and attack, say goodbye to one of your app's chief security vectors
- **Recycle instantly** – no more lag to do simple things like modify environment variables, cloud functions are easily reconfigured, and changes go live in milliseconds
- **Never require patching** - the latest under-the-hood security updates are baked into every invocation in real-time, without maintainer intervention
- **Never require maintenance** - planned downtime to tidy up your server cluster is simply a thing of the past
- **Only pay for what you for what you use, and at affordable rates** - not having to keep servers running means not having to pay for servers sitting idle; and even when in heavy use, cloud functions are highly affordable

Cloud function apps embody the dream we've been promised of the cloud for decades. With these new superpowers comes new considerations.


## Cloud function considerations

### **Statelessness between invocations**
Unlike servers, which can take seconds or minutes to spin up, cloud functions start in milliseconds, and can instantly fan out to massive scale.
- This is possible because cloud functions are effectively stateless between each invocation
- However, many of today's applications assume some statefulness between executions, so this may be a new consideration for your application architecture


### **Statelessness can impact your choice of database**
Because cloud functions are effectively stateless, older socket-based data persistence systems (example: most SQL databases) can become overwhelmed by their need to open and close connections so frequently.
- For this reason, cloud functions work best with persistence systems that utilize fast, non-socket based methods of transaction (e.g. HTTP, API, etc.)
- Examples include Begin Data / DynamoDB, Firebase, RethinkDB, FaunaDB, GraphQL, etc.
- This is, of course, evolving! We understand there projects launching soon to enable cloud function-friendly accessing of socket-based databases like SQL, Postgres, MongoDB, etc.


### **Smaller cloud functions run faster**
Cloud functions start and run fastest when they're small and discrete.
- For this reason Begin applications split your application up into individual, stateless functions, each its own directory in your repo
- Of course, intra-project code sharing would be a requirement to keep things dry, so Begin applications share code via `src/shared/` and `src/views/` dirs ([learn more here](/en/getting-started/project-structure))
- In practice, this looks a lot like a microservices-based architecture, except now it has the advantage of being reflected in how your app runs in the cloud
- This also has the added benefit of massively aiding debugging – no more grepping through your entire application's logs, just look at the cloud function in which you've got the bug!
