## Overview

The function-config file (`.arc-config`) is a file found inside an individual HTTP function directory that allows you to change and modulate your function's settings to fit your use case.

### Provisioning new function config

To provision a new function-config to an individual HTTP function, add a `.arc-config` file to its directory.

### Configure individual Lambda function properties

Below is a list of function properties that can be updated within an HTTP function and the appropriate syntax.

- `runtime` - Officially supported: one of `nodejs12.x` (default), `nodejs10.x`, `deno`, `python3.7`, `python3.6`, or `ruby2.5`
  - Also configurable, but not officially supported by Architect: `java8`, `go1.x`, `dotnetcore2.1`
- `memory` - number, between 128 MB and 3008 MB in 64 MB increments
  - Memory size also directly correlates with CPU speed; higher memory levels are available in more capable Lambda clusters
- `timeout` - number, in seconds (max 900)
- `concurrency` - number, `0` to AWS account maximum (if not present, concurrency is unthrottled)
- `layers` - Lambda layer ARNs (must be in the same region as deployed)
- `policies` - Additional Lambda role policy ARNs


```bash
@aws
runtime python3.7
memory 256
timeout 3
concurrency 1
layers {ARN}
policies {ARN}
```

## Limits

Read more about the [Lambda limits here on Amazon](https://docs.aws.amazon.com/lambda/latest/dg/limits.html) 