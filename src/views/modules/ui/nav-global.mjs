import { html } from '../vendor/preact.mjs'
import BeginURI from '../util/begin-uri.mjs'
import joinClass from '../util/join-classes.mjs'
import Constants from '../resource/constants.mjs'
import GlobalNavLink from './link-global-nav.mjs'
import LoginLink from './link-global-login.mjs'
const linkClass = 'mb-2 mb-none-lg mr1-lg'
const defaultClass = `
  w-100
  max-h-infinity-lg
  max-h-0
  p-absolute
  p-static-lg
  d-flex-lg
  jc-b
  pr-4
  pl-4
  bg-p25
  o-hidden
  menu-transition
  z1
  z0-lg
`
const defaultStyle = `
top:2.8rem;
right:0;
left:0;
border-bottom-right-radius:6px;
border-bottom-left-radius:6px;
`

function AccountLabel () {
  return html`
<span class="d-none-lg">
  Account settings
</span>
  `
}

export default function GlobalNav (props) {
  props = props || {}
  let account = props.account || {}
  let authed = typeof account.accountID !== 'undefined'
  let username = account.username
    ? BeginURI(account.username)
    : BeginURI('username')
  let avatar = account.avatar
  let docsActive = true // hack the planeeeeettttt
  let login = authed
    ? ''
    : html`<${LoginLink}><//>`
  let accountLabel = html`<${AccountLabel}><//>`
  let mergedClass = joinClass(
    defaultClass,
    props.disclosed
      ? 'max-h-infinity'
      : ''
  )

  return html`
<nav
  class="${mergedClass}"
  style="${defaultStyle}"
>
  <span
    class="d-flex-lg"
  >
  ${authed
    ? html`<${GlobalNavLink}
      href="${BeginURI('apps')}"
      class="${linkClass}"
      icon="apps"
      label="Apps"
    ><//>`
    : ''
  }
    <${GlobalNavLink}
      href="/"
      class="${linkClass}"
      icon="docs"
      label="Docs"
      active="${docsActive}"
    ><//>
    <${GlobalNavLink}
      href="${Constants.links.learn}"
      class="${linkClass}"
      icon="learn"
      label="Learn"
      target"_blank"
    ><//>
    <${GlobalNavLink}
      href="${Constants.links.community}"
      class="${linkClass}"
      icon="heart"
      label="Community"
      target="_blank"
    ><//>
    <${GlobalNavLink}
      href="${Constants.links.support}"
      class="${linkClass}"
      icon="support"
      label="Support"
      target="_blank"
    ><//>
  </span>
  <span
    class="mb0 mb-none-lg d-flex fd-c fd-r-lg"
  >
    ${login}
    ${authed
      ? html`<${GlobalNavLink}
      href="${BeginURI('account')}"
      class="mb-2 mb-none-lg"
      icon="settings"
      label="${accountLabel}"
    ><//>
    <a
      href="${username}"
      class="d-flex ai-c fs-off-scale fw-medium upper lh2 pr0 pl-3 pr-none-lg pl-none-lg c-p26 c-h3 c-a5 bg-a7 br-pill transition-all mb-2 mb-none-lg"
    >
      <div class="avatar mr-3 mr-none-lg">
        <img
          src="${avatar}"
          alt="Profile avatar"
          class="
            br-100
            o-hidden
          "
          style="
            object-fit: cover;
          "
        />
      </div>
      <span class="d-none-lg">
        Your profile
      </span>
    </a>`
      : ''
    }
  </span>
</nav>
  `
}
