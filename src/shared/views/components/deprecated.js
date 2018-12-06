// FIXME oh this was so hacky
let classes = 'c-p1 mt1'
let styles = 'background-color: #25A78B; border-left-style: none;'
let linkStyles = 'color: #fff;'
let linkClasses = 'td-u c-p1 c-a1'

module.exports = function DeprecatedNotice(state) {
  state = state || {}
  let deprecated = state.deprecated
  let referTo = state.referTo
  let refer = `Please instead <a href=${referTo} class="${linkClasses}" style="${linkStyles} font-weight: 500;">head here</a>.`

  if (deprecated) return `<blockquote style="${styles}" class="${classes}">
<p style="font-weight: 500;">
This document is now deprecated. ${referTo ? refer : ''}
</p>
</blockquote>
`
  else return ''
}
