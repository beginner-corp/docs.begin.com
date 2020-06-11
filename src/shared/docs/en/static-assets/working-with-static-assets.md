## Overview

Pretty much every app requires access to hosted static assets of some kind or another. Images are probably the most obvious example.

And while Begin can do things like deliver your app's [JS and CSS dynamically via an HTTP Function](/en/functions/http/), it's still super common for workflows to generate build artifacts best delivered from services optimized for static hosting, like CDNs.

Fortunately, that's why Begin has the ability to build (if necessary) and deploy static assets to blob storage (S3) deliver them via CDN out of the box.


## The static asset directory

Get started working with static assets by using the `public/` directory in your project's root directory. This directory is configurable (more on that in a moment), but for the sake of terseness, we'll refer to your app's static asset directory in these docs simply as `public/`.

By default, anything in your `public/` folder will be deployed to your app's file bucket, retaining its file name and any subdirectories you've specified.

If you'd like to use a different folder name for delivering static assets, such as `assets`, add the following setting in your project manifest file (usually `.arc`):

```arc
@static
folder assets
```

You can also work locally with static assets, by calling them from the Begin dev server's `/_static/` directory. For example, when working locally:
- `public/fluffypupper.jpg` resolves to:
- `http://localhost:3333/_static/fluffypupper.jpg`

Just remember to point your app at the correct path in your code. More below on techniques for [accessing static assets](#accessing-static-assets).


## Other static asset options

Begin supports a number of options for helping deliver your static assets. These include:

- `fingerprint` - **true** or **external** (disabled by default)
  - `true` enables static asset fingerprinting; this is the most efficient way to deliver your assets to users. Fingerprinting overwrites an existing filename with a fingerprinted filename based on its contents, and delivers said file with long-lived cache headers.
    - For example: `this-is-fine.gif` becomes `this-is-fine-e8ba2.gif`
    - A map of all static assets is available to each of your functions automatically at `node_modules/@architect/shared/static.json` and from your app at `/_static/static.json`
  - `external` assumes you're using an external framework of some kind that handles its own fingerprinting; as such, it does not mutate the filename upon deploy or generate a `static.json` file, but it does ensure your files are delivered efficiently with long-lived cache headers
- `folder` - **String** (`public` by default)
  - Configure the asset directory to deploy your project's static assets from; do not include a leading or trailing slash
- `ignore` - **One or more Strings** (indented two spaces on each line)
  - Each string provided will match against filenames in your asset folder, and any matches found will be ignored from deployment
- `prune` - **Boolean** (`true` by default)
  - Removes any files not found in your deploy from your bucket; we strongly suggest leaving this enabled to ensure the assets available to your app are completely deterministic
- `spa` - **Boolean** (`true` by default)
  - Enables or disables SPA (single-page app) mode for your root requests;

Example:
```arc
@app
your-app

@static
fingerprint true
folder assets
ignore
  .js.map
  tiff
prune true
spa false
```


## `build`ing and deploying assets

A common pattern for generating frontend build artifacts is to compile JS and CSS (among other things).

`public/` works great with [Webpack](https://webpack.js.org/comparison/), [Parcel](https://parceljs.org/), [Rollup](https://rollupjs.org/guide/en), and other modern bundlers.

Simply create and specify a [build script or build command in your root `package.json`](/en/getting-started/builds-deploys/#build), with your compilation target set to `public/`. (Or, as mentioned above, customize the folder with the `folder` setting in your project manifest.)

Your build steps will run with each deploy, and anything present in `public/` will be pushed to your app's file bucket.

As with the rest of your app, any push to `master` deploys assets to your `staging` file bucket, and `production` releases deploy assets to, you guessed it, your `production` file bucket.

By default, your app is also configured with `staging` and `production` CDN paths pointing to your respective file buckets as its origin. Thus, to access your assets via CDN, simply use your app's CDN path when appropriate.


## Accessing your static assets

Generally, the best way to access your static assets is through the `/_static` path of your app. As in the above example:

- `public/fluffypupper.jpg` resolves to:
- `http://yourappname.begin.app/_static/fluffypupper.jpg`

Additionally, Begin's most commonly used Lambda runtime helper library, [Architect Functions](https://www.npmjs.com/package/@architect/functions), includes an `arc.static()` method for accessing your fingerprinted filenames automatically. Example:

```javascript
let arc = require('@architect/functions')
let image = `<img src=${arc.static('this-is-fine.gif')}>`
```


### Static asset environment variables

Your app has the following environment variables available for accessing static asset paths if you require greater customization for your static asset access patterns than `/_static`:

- `ARC_STATIC_BUCKET` - The root URL of your file bucket, example: `begin-static-f3uw1-staging`)
- `ARC_STATIC_PREFIX` - The subfolder containing your app's static assets; (this also happens to be your app name), example: `fun-af1`
- `BEGIN_STATIC_ORIGIN` - Fully-qualified path of your app's file origin (essentially combines the above two env vars), example: `https://begin-static-f3uw1-staging.s3.us-west-1.amazonaws.com/fun-af1`
- `BEGIN_STATIC_EDGE` - Fully qualified path of your app's CDN, which you may want to use in `production`; example: `https://static-f3uw1-staging.begin.app/fun-af1`


Here's an example of environment-aware helper for accessing your static assets:

```javascript
function staticAsset (filename) {
  if (process.env.NODE_ENV === 'production') {
    return `${process.env.BEGIN_STATIC_EDGE}/${filename}` // CDN
  }
  return `/_static/${filename}`
}
```
