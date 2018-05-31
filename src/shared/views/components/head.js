module.exports = function head (meta) {
  meta = meta || {}
  var title = meta.title || 'Begin documentation'
  var description = meta.description || 'Begin documentation'
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
