module.exports = function Category(ToC, categoryIndex) {
  ToC = ToC || {}
  var categoryTitle = ToC[categoryIndex].catTitle

  return `
<div class="pt0">
  <header class="mb-4 pr0 pl0">
    <h3 class="fw-normal fs-1 c-p8 nowrap heading-sm">
      ${categoryTitle}
    </h3>
  </header>
</div>
`
}
