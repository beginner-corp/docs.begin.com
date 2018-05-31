module.exports = function head (state) {
  state = state || {}
  var title = state.title || 'Begin documentation'
  var description = state.description || 'Begin documentation'
  return `
<head>
  <title>Begin documentation - ${title}</title>
  <meta name="description" content="${description}"/>
  <link rel="stylesheet" href="/css/styleguide.css">
  <link rel="stylesheet" href="/css/app.css">
  <link rel="stylesheet" href="https://fonts.begin.com/fonts-slate.css">
  <link rel="stylesheet" href="https://s3.amazonaws.com/begin-fonts/fonts-inconsolata.css">
</head>
`
}
