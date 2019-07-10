module.exports = function ga () {

  let env = process.env.NODE_ENV
  let production = 'production'
  let productionId = 1
  let stagingId = 2

  function snippet (env) {
    // console.log('hello')
    return `
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-74655805-${env}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-74655805-${env}');
</script>
    `
  }

  return snippet(env == production ? productionId : stagingId)

}
