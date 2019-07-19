const crypto = require('crypto')

module.exports = function getSHA (filename, contents) {
  // Hash (buffer) contents
  if (!(contents instanceof Buffer)) contents = new Buffer.from(contents)
  let hash = crypto.createHash('sha1')
  hash.update(contents)
  let sha = hash.digest('hex').substr(0,10)

  // Modify module filename
  let path = filename.split('.mjs')
  path[path.length - 2] = `${path[path.length - 2]}-${sha}`
  path = path.join('.mjs')
  return path
}

module.exports.remove = function removeSHA (filename) {
  filename = filename.split('.mjs')
  filename[0] = filename[0].slice(0, filename[0].length - 11)
  filename = filename.join('.mjs')
  // Weed out bad filename requests
  if (filename === '.mjs' || !filename.includes('.mjs')) throw Error
  return filename
}
