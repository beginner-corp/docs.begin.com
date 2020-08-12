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


## Example app

In this example we are going to load a Lambda Layer to dynamically resize an image based on path parameters.

1. The first step is to create a new Begin project and install `GraphicsMagick` locally. You can choose to install from [these sources](http://www.graphicsmagick.org/README.html), but I chose to `brew install graphicsmagick`.

  - Follow the [Begin QuickStart](/en/guides/quickstart) to create a new project.
    - Use the minimal example app starter
  - Install graphicmagick locally.
    - `brew install graphicsmagick`

2. Now we can modify `app.arc` with 2 new routes.

  - `get /` will serve as the interface in our browser.
  - `get /resize/:size` is our app business logic that will let us take in the path parameter for the max-width of the image.

```bash
# app.arc
@app
begin-layers-magick

@http
get /
get /resize/:size
```

3. Next let's write the `get-resize` function. Modify `get-resize-000size/index.js` file.

```js
// src/http/get-resize-000size/index.js

const { execSync } = require('child_process')
const fs = require('fs')

exports.handler = async function http(req) {

  //make sure it's a number
  let resize = parseInt(req.pathParameters.size)

  // graphicsmagick is already installed to the layer
  // resize to max width input from path parameters
  await execSync(`gm convert -size ${resize} your_image.jpg -resize ${resize} +profile "*" /tmp/thumbnail.png`, { encoding: 'utf8', stdio: 'inherit' })

  //take the image out of tmp
  let image = fs.readFileSync('/tmp/thumbnail.png')

  //simple return of image
  return {
    headers: {
      "statusCode": 200,
      "Content-Type": 'image/png'
    },
    isBase64Encoded: true,
    body: image.toString('base64')
  }
}
```

4. Open `.arc-config` in the `get-resize-000size` folder and add the following. This is a [published layer](https://github.com/rpidanny/gm-lambda-layer) that you can use which already includes the build artifact to access `graphicsmagick` from Node.

```bash
# /src/http/get-resize-000size/.arc-config

@aws
runtime nodejs12.x
timeout 30
layer arn:aws:lambda:us-east-1:175033217214:layer:graphicsmagick:2

```

5. Let's modify `get-index` to give the user a browser to interact with. This will serve an HTML string with a link to an example path.

```js
// src/http/get-index/index.js

exports.handler = async function http (req) {

let body = `
<body>
<h1>Serverless Graphics Magick with Begin</h1>
<em>Praise Sloth!</em>
<p><a href='/staging/resize/600'>Click here for a sloth</a></p>
<p> Adjust size of image through path parameters, for example '/resize/200' will return the image with max width of 200px.
</body>
`
  return {
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body
  }
}
```

6. The final step is to place an image into the `get-resize-000size` folder named `your_image.jpg` and run `npm start` to see your layer in action!