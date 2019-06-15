const localURI = 'http://localhost:3333'
const stagingURI = 'https://staging.begin.com'
const productionURI = 'https://begin.com'

export default function BeginURI (path) {
  path = path || ''
  let inWindow = typeof window !== 'undefined'
  let base
  if (inWindow) {
    base = getOriginBrowser()
  } else {
    base = getOriginServer()
  }
  return `${base}/${path}`
}

function getOriginBrowser () {
  let host = window.location.host
  let local = /localhost/.test(host)
  let staging = /staging.docs.begin.com/.test(host)
  return local
    ? localURI
    : staging
      ? stagingURI
      : productionURI
}

function getOriginServer () {
  let env = process.env.NODE_ENV
  let local = process.env.ARC_LOCAL || env === 'testing'
  let staging = env === 'staging'
  return local
    ? localURI
    : staging
      ? stagingURI
      : productionURI
}
