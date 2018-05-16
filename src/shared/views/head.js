module.exports = function head (meta) {
  return `
<head>
  <title>Begin documentation - ${meta.title}</title>
  <meta name="description" content="${meta.description}"/>
</head>
`
}
