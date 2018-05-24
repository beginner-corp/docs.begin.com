var arc = require('@architect/functions')
var fs = require('fs')
var path = require('path')

var css = fs.readFileSync(path.join(__dirname, './app.css')).toString()

function route(req, res) {
  console.log(JSON.stringify(req, null, 2))
  res({css})
}

exports.handler = arc.css.get(route)
