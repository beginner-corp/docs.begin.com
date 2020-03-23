export default function Head (props) {
  props = props || {}
  let title = props.category && props.title
    ? `${props.category} > ${props.title} - Begin documentation`
    : 'Begin documentation'
  let description = props.description || 'Begin documentation'

  return `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1">
  <link rel="shortcut icon" href="https://static.begin.com/web/favicon/favicon.ico">
  <link rel="icon" sizes="16x16 32x32 64x64" href="https://static.begin.com/web/favicon/favicon.ico">
  <link rel="icon" type="image/png" sizes="196x196" href="https://static.begin.com/web/favicon/favicon-192.png">
  <link rel="icon" type="image/png" sizes="160x160" href="https://static.begin.com/web/favicon/favicon-160.png">
  <link rel="icon" type="image/png" sizes="96x96" href="https://static.begin.com/web/favicon/favicon-96.png">
  <link rel="icon" type="image/png" sizes="70x70" href="https://static.begin.com/web/favicon/favicon-70.png">
  <link rel="icon" type="image/png" sizes="64x64" href="https://static.begin.com/web/favicon/favicon-64.png">
  <link rel="icon" type="image/png" sizes="32x32" href="https://static.begin.com/web/favicon/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="https://static.begin.com/web/favicon/favicon-16.png">
  <link rel="apple-touch-icon" href="https://static.begin.com/web/favicon/favicon-180.png">
  <link rel="apple-touch-icon" sizes="180x180" href="https://static.begin.com/web/favicon/favicon-180.png">
  <link rel="apple-touch-icon" sizes="167x167" href="https://static.begin.com/web/favicon/favicon-167.png">
  <link rel="apple-touch-icon" sizes="152x152" href="https://static.begin.com/web/favicon/favicon-152.png">
  <link rel="apple-touch-icon" sizes="144x144" href="https://static.begin.com/web/favicon/favicon-144.png">
  <link rel="apple-touch-icon" sizes="120x120" href="https://static.begin.com/web/favicon/favicon-120.png">
  <link rel="apple-touch-icon" sizes="114x114" href="https://static.begin.com/web/favicon/favicon-114.png">
  <link rel="apple-touch-icon" sizes="76x76" href="https://static.begin.com/web/favicon/favicon-76.png">
  <link rel="apple-touch-icon" sizes="72x72" href="https://static.begin.com/web/favicon/favicon-72.png">
  <link rel="apple-touch-icon" sizes="60x60" href="https://static.begin.com/web/favicon/favicon-60.png">
  <link rel="apple-touch-icon" sizes="57x57" href="https://static.begin.com/web/favicon/favicon-57.png">
  <link rel="manifest" href="/manifest.json">
  <meta name="theme-color" content="#002d4d">
  <meta name="msapplication-TileColor" content="#002d4d">
  <meta name="msapplication-TileImage" content="https://static.begin.com/web/favicon/favicon-144.png">
  <meta name="msapplication-config" content="https://static.begin.com/web/favicon/browserconfig.xml">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

  <!-- HTML Meta Tags -->
    <title>${title}</title>
    <meta name="description" content="${description}"/>
    <!-- Google / Search Engine Tags -->
    <meta itemprop="name" content="Begin - Modern apps built fast af.">
    <meta itemprop="description" content="Begin is a ridiculously quick platform for building modern web apps, sites, & APIs. Get started for free, no credit card required.">
    <meta itemprop="image" content="http://s3.us-west-1.amazonaws.com/begin-staging/web/begin-meta-6f864404ab.png">
    <!-- Facebook Meta Tags -->
    <meta property="og:url" content="https://begin.com">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Begin - Modern apps built fast af.">
    <meta property="og:description" content="Begin is a ridiculously quick platform for building modern web apps, sites, & APIs. Get started for free, no credit card required.">
    <meta property="og:image" content="http://s3.us-west-1.amazonaws.com/begin-staging/web/begin-meta-6f864404ab.png">
    <!-- Twitter Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Begin - Modern apps built fast af.">
    <meta name="twitter:description" content="Begin is a ridiculously quick platform for building modern web apps, sites, & APIs. Get started for free, no credit card required.">
    <meta name="twitter:image" content="http://s3.us-west-1.amazonaws.com/begin-staging/web/begin-meta-6f864404ab.png">
    <!-- Meta Tags end-->

  <link rel="stylesheet" href="/css/app.css">
  <link rel="stylesheet" href="https://fonts.begin.com/fonts.css">
</head>
`
}
