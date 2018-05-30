let arc = require('@architect/functions')
let postcss = require('postcss');
let simpleExtend = require('postcss-extend');
// let mitten = require('cssmitten')
// let config = require('cssmitten/config')
// let cached = mitten(JSON.stringify(config))
let fs = require('fs')
let read = fs.readFileSync
let inputExtend = read(__dirname + '/_extend.css').toString()
let inputStyleguide = read(__dirname + '/_styleguide.css').toString()

function inputCss () {
  return inputExtend + '\n\n' + inputStyleguide
}

var outputCss = postcss()
  .use(simpleExtend())
  .process(inputCss())
  .css;

function route(req, res) {
  res({
    css: outputCss
  })
}

exports.handler = arc.css.get(route)
