import { html } from '../vendor/preact.mjs'
import joinClass from '../util/join-classes.mjs'
import Constants from '../resource/constants.mjs'
import GlobalNavLink from './link-global-nav.mjs'
import UpgradeLink from './link-global-upgrade.mjs'
const linkClass = 'mb-2 mb-none-lg mr1-lg'
const defaultClass = `
  w-100
  mh-none
  mh-infinity-lg
  p-absolute
  p-static-lg
  d-flex-lg
  jc-b
  pr-4
  pl-4
  o-hidden
  bg-p25
  menu-transition
  z1
  z0-lg
`
const defaultStyle = `
top:3rem;
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
  let username = account.username
    ? '/' + account.username
    : '/username'
  let avatar = account.avatar
  let appsActive = props.active === 'apps'
  let plansActive = props.active === 'plans'
  let upgrade = !account.paidAccount
    ? html`<${UpgradeLink} active="${plansActive}"><//>`
    : ''
  let accountLabel = html`<${AccountLabel}><//>`
  let mergedClass = joinClass(
    defaultClass,
    props.open
      ? 'mh-infinity'
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
    <${GlobalNavLink}
      href="/apps"
      class="${linkClass}"
      icon="apps"
      label="Apps"
      active="${appsActive}"
    ><//>
    <${GlobalNavLink}
      href="${Constants.links.docs.site}"
      class="${linkClass}"
      icon="docs"
      label="Docs"
      target="_blank"
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
    ${upgrade}
    <${GlobalNavLink}
      href="/account"
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
    </a>
  </span>
</nav>
  `
}
