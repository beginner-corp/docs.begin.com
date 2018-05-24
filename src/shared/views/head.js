module.exports = function head (meta) {
  return `
<head>
  <title>Begin documentation - ${meta.title}</title>
  <meta name="description" content="${meta.description}"/>
  <link rel="stylesheet" href="https://s3-us-west-1.amazonaws.com/begin-functions-staging/begin-v1527118915.css">
  <link rel="stylesheet" href="/css/app.css">
  <link rel="stylesheet" href="https://fonts.begin.com/fonts-slate.css">
</head>
`
}
