# Begin documentation!

## Getting started

`npm i && npm start` should get you going!


## Document heirarchy

Documents and views are shared across the site, and are found in `src/shared/docs/{language}/{section name}/{doc name}`

Each doc must possess two files:
- `{doc name}-content.md` - Markdown of doc's content
- `{doc name}-meta.json` - JSON of doc's metadata

Document names should be dasherized.

Thus, to create a new document available at `https://docs.begin.com/foo/bar-baz`, create the following two files:
- `src/shared/docs/en/foo/bar-baz-content.md`
- `src/shared/docs/en/foo/bar-baz-meta.json`

### Document metadata

Each document contains a JSON file used to populate the page, including the following keys:
- `title` - Used to display the page title (not including the site's name); should be ≤ 40 chars.
- `description` - A brief description; should be ≤ 300 chars.
- `github` - GitHub URL of the corresponding markdown doc to be edited
- `docSections` - Array of document sections (denoted with `##` in the markdown document); document section objects possess the following two keys:
  - `docSectionName` - Name of the document section; should match what's in the markdown document
  - `docSectionAnchor` - Named anchor; should match the output of markdown (note: trailing punctuation is parsed as a trailing dash, i.e. a `docSectionName` of "Hi!" produces a `docSectionAnchor` of "#hi-")



```javascript
{
  "title": "How to rate dogs",
  "description": "An introduction to rating dogs",
  "github": "https://github.com/smallwins/docs.begin.com/blob/master/src/shared/docs/en/getting-started/introduction-content.md"
}
```
