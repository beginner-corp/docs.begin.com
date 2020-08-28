## Overview

`@architect/functions` is our runtime helper library for serverless apps built with Architect & Begin! All you have to do is install `@architect/functions` in the specific lambda function and then require it inside of your module. You can find examples of how to do this below:

### Install runtime helpers for Node

```bash
cd path/to/lambda
npm init -f
npm install @architect/functions
```

### Install runtime helpers for Ruby

```bash
cd path/to/lambda
bundle init
bundle install --path vendor/bundle
bundle add architect-functions
```

### Install runtime helpers for Python

```bash
cd path/to/lambda
pip install --target ./vendor architect-functions
```

To use our runtime helpers inside of a module in your node environment, simply require as shown below.

```js
let arc = require('@architect/functions')
```

