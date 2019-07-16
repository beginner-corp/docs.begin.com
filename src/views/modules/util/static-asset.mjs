import store from '../data/store.mjs'
const localStatic = '/_static'
const S3Staging = 'https://begin-docs-staging.s3.us-west-1.amazonaws.com'
const CFProduction = 'https://static.docs.begin.com'

/**
 * Determines asset paths for:
 *   browser || server && `staging` || `production`
 */
export default function staticAsset (filename) {
  let {inWindow} = getEnv()
  let origin
  origin = inWindow
    ? getOriginBrowser()
    : getOriginServer()
  filename = inWindow
    ? getFilenameBrowser(filename)
    : getFilenameServer(filename)
  return `${origin}/${filename}`
}

function getEnv () {
  const inWindow = typeof window !== 'undefined'
  if (inWindow) {
    let host = window.location.host
    return {
      inWindow,
      local: /localhost/.test(host),
      staging: /staging.docs.begin.com/.test(host)
    }
  } else {
    let env = process.env.NODE_ENV
    return {
      inWindow,
      local: process.env.ARC_LOCAL || env === 'testing',
      staging: env === 'staging'
    }
  }
}

function getOriginBrowser () {
  let {local, staging} = getEnv()
  return local
    ? localStatic
    : staging
      ? S3Staging
      : CFProduction
}

function getOriginServer () {
  let {local, staging} = getEnv()
  return local
    ? localStatic
    : staging
      ? S3Staging
      : CFProduction
}

function getFilenameBrowser (filename) {
  const staticAssets = store().staticAssets
  let {local} = getEnv()
  let hashed = staticAssets[filename]
  return local
    ? filename
    : hashed
}

function getFilenameServer (filename) {
  const staticAssets = JSON.parse(process.env.STATIC_ASSETS)
  let {local} = getEnv()
  let hashed = staticAssets[filename]
  return local
    ? filename
    : hashed
}
