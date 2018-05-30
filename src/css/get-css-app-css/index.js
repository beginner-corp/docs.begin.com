var arc = require('@architect/functions')
var fs = require('fs')
var path = require('path')

var css = fs.readFileSync(path.join(__dirname, './_app.css')).toString()

function route(req, res) {
  res({css})
}

exports.handler = arc.css.get(route)
