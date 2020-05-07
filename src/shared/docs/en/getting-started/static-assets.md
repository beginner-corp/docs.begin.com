## Overview

Pretty much every app requires access to hosted static assets of some kind or another. Images are probably the most obvious example.

And while Begin can do things like deliver your app's [JS and CSS dynamically via an HTTP Function](/en/functions/http/), it's still super common for workflows to generate build artifacts best delivered from services optimized for static hosting, like CDNs.

Fortunately, that's why Begin has the ability to build (if necessary) and deploy static assets to blob storage (S3) deliver them via CDN out of the box.


## The `public/` directory

Get started working with static assets by using the `public/` directory in your project's root directory.

Anything in your `public/` folder will be deployed to your app's file bucket, retaining its file name and any subdirectories you've specified.

You can also work locally with static assets, by calling them from the Begin dev server's `/_static/` directory. For example, when working locally:
- `public/fluffypupper.jpg` resolves to:
- `http://localhost:3333/_static/fluffypupper.jpg`

Just remember to point your app at the correct path in your code. More below on techniques for [accessing static assets](#accessing-static-assets).


## `build`ing and deploying assets

A common pattern for generating frontend build artifacts is to compile JS and CSS (among other things).

`public/` works great with [Webpack](https://webpack.js.org/comparison/), [Parcel](https://parceljs.org/), [Rollup](https://rollupjs.org/guide/en), and other modern bundlers.

Simply create and specify a [build script or build command in your root `package.json`](/en/getting-started/builds-deploys/#build), with your compilation target set to `public/`.

Your build steps will run with each deploy, and anything present in `public/` will be pushed to your app's file bucket.

As with the rest of your app, any push to `master` deploys assets to your `staging` file bucket, and `production` releases deploy assets to, you guessed it, your `production` file bucket.

By default, your app is also configured with `staging` and `production` CDN paths pointing to your respective file buckets as its origin. Thus, to access your assets via CDN, simply use your app's CDN path when appropriate.


## Accessing static assets

Begin supports accessing static assets locally before they've been promoted to deployment to your file bucket. Depending on the stage and service you'd like to access an asset from, just swap out the paths as necessary.


### Static asset environment variables

Your app has the following environment variables available for accessing static asset paths:

- `ARC_STATIC_BUCKET` - The root URL of your file bucket, example: `begin-static-f3uw1-staging`)
- `ARC_STATIC_FOLDER` - The subfolder containing your app's files, example: `fun-af1`
- `BEGIN_STATIC_ORIGIN` - Fully-qualified path of your app's file origin (essentially combines the above two env vars), example: `https://begin-static-f3uw1-staging.s3.us-west-1.amazonaws.com/fun-af1`
- `BEGIN_STATIC_EDGE` - Fully qualified path of your app's CDN, which you'd want to use in `production`; example: `https://static-f3uw1-staging.begin.app/fun-af1`

Here's an example environment-aware helper for accessing your static assets. (You may want to add additional customization to better take advantage of Begin's staging and production asset pipelines, too.)

```javascript
function staticAsset(filename) {
  let origin
  // these variables are always available to all lambdas
  let env = process.env.NODE_ENV
  if (env === 'production') {
    origin = process.env.BEGIN_STATIC_EDGE // CDN
  } else if (env === 'staging') {
    origin = process.env.BEGIN_STATIC_ORIGIN // Preview
  } else {
    origin = '/_static' // Handles local use cases
  }
  return `${origin}/${filename}`
}
```
