import store from '../data/store.mjs'

/**
 * Determines asset paths for:
 *   browser || server && `staging` || `production`
 */
export default function staticAsset (filename) {
  let {inWindow} = getEnv()
  filename = inWindow
    ? getFilenameBrowser(filename)
    : getFilenameServer(filename)
  return `/_static/${filename}`
}

function getEnv () {
  const inWindow = typeof window !== 'undefined'
  if (inWindow) {
    let host = window.location.host
    return {
      inWindow,
      local: /localhost/.test(host),
    }
  } else {
    let env = process.env.NODE_ENV
    return {
      inWindow,
      local: process.env.ARC_LOCAL || env === 'testing',
    }
  }
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
