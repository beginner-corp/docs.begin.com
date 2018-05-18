# `shared/docs`

Docs! See readme.

# `render.js` + `shared/views`

Renders views.

# Styled markdown support

The below list defines the markdown entities Begin will (and won't) support in our documentation's CSS.

---

✅ Supported

## Document section
## Document section with `inline code`
## [Document section](#) linked
### Document subsection
### Document subsection with `inline code`
### [Document subsection](#) linked

Normal copy

Copy [with a link](#)

Copy with **bold** text

Copy with **[bold](#)** linked text

Copy with ~~struck through~~ text

Copy with ~~[struck through](#)~~ linked text

Copy with `inline code`

Copy with [`linked inline code`](#)

```javascript
function codeblock() {
  console.log('full code block')
}
```

> Blockquoted text
> Which can span multiple lines


- Unordered lists
- Unordered list item
  - Unordered nested list item
    - Unordered nested list item
- Unordered list item


1. Ordered lists
2. Ordered list item
   - Unordered nested list item
     - Unordered nested list item
3. Ordered list item


| tables   | data      |
|----------|-----------|
| cell 1   | cell 2    |


Images ↓

![Images](http://www.placepuppy.net/400/250)

Horizontal rules ↓

-----


❌ Not supported

# H1
# H1 with `inline code`
# [H1](#) linked
#### H4
#### H4 with `inline code`
#### [H4](#) linked
##### H5
##### H5 with `inline code`
##### [H5](#) linked
###### H6
###### H6 with `inline code`
###### [H6](#) linked

Copy with _italic_, and **_bold italic_** text

Copy with _[italic](#)_, and **_[bold italic](#)_** linked text

- [ ] Checkbox lists
- [ ] Checkbox list item