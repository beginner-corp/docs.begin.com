const localStatic = '/_static'
const S3Staging = 'https://s3.us-west-1.amazonaws.com/begin-staging'
const CFProduction = 'https://static.begin.com'

export default function staticAsset (filename) {
  let inWindow = typeof window !== 'undefined'
  let origin
  if (inWindow) {
    origin = getOriginBrowser()
  } else {
    origin = getOriginServer()
  }
  return `${origin}/${filename}`
}

function getOriginBrowser () {
  let host = window.location.host
  let local = /localhost/.test(host)
  let staging = /staging.begin.com/.test(host)
  return local
    ? localStatic
    : staging
      ? S3Staging
      : CFProduction
}

function getOriginServer () {
  let env = process.env.NODE_ENV
  let local = process.env.ARC_LOCAL || env === 'testing'
  let staging = env === 'staging'
  return local
    ? localStatic
    : staging
      ? S3Staging
      : CFProduction
}
