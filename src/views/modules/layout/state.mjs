export default function State (props) {
  props = props || {}
  return props
    ? `
<script>
  window.__STATE__ = ${JSON.stringify(props)}
</script>
  `
  : ''
}
