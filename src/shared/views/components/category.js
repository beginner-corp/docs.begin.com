module.exports = function Category(ToC, categoryIndex) {
  ToC = ToC || {}
  var categoryTitle = ToC[categoryIndex].catTitle

  return `
<div id="category">
  <header class="mb-2">
    <h3 class="fw-normal fs-1 c-p8 nowrap heading-sm">
      ${categoryTitle}
    </h3>
  </header>
</div>
`
}
