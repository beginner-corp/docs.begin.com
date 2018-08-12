var styles = 'logo d-flex ai-c'

module.exports = function Logo (state) {
  state = state || {}
  var id = state.id || ''

  return `
<div class="${styles}" id="${id}">
  <a
    href="/"
    id="logo"
  >
    <img
      src="https://static.begin.com/web/asset/begin-logo.svg"
      alt="begin logo"
      height="24.4"
    >
  </a>
</div>
`
}
