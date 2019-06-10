import { html, render } from '../vendor/preact.mjs'

export default function renderConent (page, props) {
  if (typeof window !== 'undefined') {
    let content = document.getElementById('begin-content')
    render(
      html`<${page} ...${props}><//>`,
      content,
      content.firstElementChild
    )
  }
}
