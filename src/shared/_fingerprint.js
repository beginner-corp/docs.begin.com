const fs = require('fs')
const join = require('path').join
const staticManifest = fs.existsSync(join(process.cwd(), 'node_modules', '@architect', 'shared', 'static.json'))

/**
 * Check static asset fingerprint status in environment
 *   - `fingerprint.enabled`: returns boolean
 */
module.exports = {
  enabled () {
    if (staticManifest) {
      return true
    }
    else return false
  }
}
