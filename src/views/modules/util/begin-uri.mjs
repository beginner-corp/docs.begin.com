const URIs = {
  local: {
    begin: 'http://localhost:3333',
    docs: 'http://localhost:4445'
  },
  staging: {
    begin: 'https://staging.begin.com',
    docs: 'https://staging.docs.begin.com'
  },
  production: {
    begin: 'https://begin.com',
    docs: 'https://docs.begin.com'
  }
}

export default function BeginURI (site, path) {
  if (!site && !path) {
    site = 'begin'
    path = ''
  }
  else if (!path) {
    // If no site specified, default to Begin
    path = JSON.parse(JSON.stringify(site))
    site = 'begin'
  }
  path = path || ''
  let inWindow = typeof window !== 'undefined'
  let base
  if (inWindow) {
    base = getOriginBrowser(site)
  } else {
    base = getOriginServer(site)
  }
  return `${base}/${path}`
}

function getOriginBrowser (site) {
  let host = window.location.host
  let local = /localhost/.test(host)
  let staging = /staging.docs.begin.com/.test(host)
  return local
    ? URIs.local[site]
    : staging
      ? URIs.staging[site]
      : URIs.production[site]
}

function getOriginServer (site) {
  let env = process.env.NODE_ENV
  let local = process.env.ARC_LOCAL || env === 'testing'
  let staging = env === 'staging'
  return local
    ? URIs.local[site]
    : staging
      ? URIs.staging[site]
      : URIs.production[site]
}
