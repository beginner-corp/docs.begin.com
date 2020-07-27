## Overview

Layers contain additional code, libraries, and dependencies used to support an HTTP function at runtime. Layers eliminate the need to package external dependencies in your package.json for each HTTP function you create.

> ⚠️ A function can use up to 5 layers at a time. The total unzipped size of the function and all layers can't exceed the unzipped deployment package size limit of 250 MB. For more information, see [AWS Lambda limits](https://docs.aws.amazon.com/lambda/latest/dg/limits.html).


## Provisioning new layer

You can provision your new layer inside an HTTP function by including the layer syntax in the `.arc-config` of your function. You can find an example of how this looks below:

```bash
@aws
runtime python3.7
memory 256
timeout 3
concurrency 1
layers
  arn:aws:lambda:us-west-2:111111111111:layer:myLayer:1
  arn:aws:lambda:us-west-2:111111111111:layer:mySecondLayer:1
```
> ⚠️ Syntax for layers include either `layer arn` or `layer` followed by a newline and two spaces