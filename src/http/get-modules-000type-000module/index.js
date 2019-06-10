const { promisify } = require('util')
const fs = require('fs')
const readFile = promisify(fs.readFile)
const join = require('path').join

exports.handler = async function http (req) {
  let type = req.params.type
  let module = req.params.module
  let requested = join(__dirname, 'node_modules', '@architect', 'views', 'modules', type, module)
  try {
    let js = await readFile(requested)
    js = js.toString()
    return {
      type: 'text/javascript; charset=utf8',
      body: js
    }
  } catch (err) {
    return {
      type: 'text/plain; charset=utf8',
      status: 404,
      body: `File ${requested} not found.`
    }
  }
}
