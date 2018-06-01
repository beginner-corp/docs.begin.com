let arc = require('@architect/functions')
let cssmitten = require('cssmitten')
let postcss = require('postcss')
let simpleExtend = require('postcss-extend')
let fs = require('fs')
let read = fs.readFileSync

let config = read(__dirname + '/_config.json').toString()
let styleguide = cssmitten(config)
let app = read(__dirname + '/_app.css').toString()
let extend = read(__dirname + '/_extend.css').toString()

function createCss () {
  return app + '\n\n' + extend + '\n\n' + styleguide
}

var css = postcss()
  .use(simpleExtend())
  .process(createCss())
  .css

function route(req, res) {
  res({
    css: css
  })
}

exports.handler = arc.css.get(route)
