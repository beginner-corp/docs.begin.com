import { html } from '../vendor/preact.mjs'
import Link from './link.mjs'

export default function EditPage (props) {
  props = props || {}
  let lang = props.lang || 'en'
  let {cat, doc} = props.active
  let link = `https://github.com/smallwins/docs.begin.com/edit/master/src/shared/docs/${lang}/${cat}/${doc}.md`

  return html`
<div>
  <hr class="mt4 mb4 b-b b-p18"/>
  <${Link}
    href="${link}"
    class="fs1"
    target="_blank"
  >
    Edit this page on GitHub
  <//>
</div>
  `
}
