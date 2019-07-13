const localStatic = '/_static'
const S3Staging = 'https://begin-docs-staging.s3.us-west-1.amazonaws.com'
const CFProduction = 'https://static.docs.begin.com'
let local
let staging

/**
 * Determines asset paths for:
 *   browser || server && `staging` || `production`
 */
export default function staticAsset (filename) {
  let inWindow = typeof window !== 'undefined'
  if (inWindow) {
    let host = window.location.host
    local = /localhost/.test(host)
    staging = /staging.docs.begin.com/.test(host)
  } else {
    let env = process.env.NODE_ENV
    local = process.env.ARC_LOCAL || env === 'testing'
    staging = env === 'staging'
  }

  let origin
  origin = inWindow
    ? getOriginBrowser()
    : getOriginServer()
  return `${origin}/${filename}`
}

function getOriginBrowser () {
  return local
    ? localStatic
    : staging
      ? S3Staging
      : CFProduction
}

function getOriginServer () {
  return local
    ? localStatic
    : staging
      ? S3Staging
      : CFProduction
}

// function getFilenameBrowser () {
//   // TODO
// }

// function getFilenameServer () {
//   // TODO
// }
