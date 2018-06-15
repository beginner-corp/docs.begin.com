# Begin documentation!

## Getting started

`npm i && npm start` should get you going!


## Document heirarchy

Documents and views are shared across the site, and are found in `src/shared/docs/{language}/{category}/{doc}`

Since categories and document names are used as IDs, category names must be unique within each language, and document names must be unique within each category.

Category IDs match their folder names, and document IDs match their filenames. The filename convention for docs is simply: `{doc}.md`

Category and document names should be dasherized.

Thus, to create a new document available at `https://docs.begin.com/foo/bar-baz`, create the following folder and file:
- `src/shared/docs/en/foo/bar-baz.md`


### Document metadata

Each language contains a table of contents JSON file at its root (`ToC.json`) used to populate the nav tree, documents, and metadata.

The following keys are required unless stated otherwise:

- `cat` - Category name (i.e. `getting-started`)
- `catTitle` - Friendly category title (i.e. `Getting Started`)
- `docs` - Array containing category's document objects; each document object contains the following keys:
  - `doc` - Document name (i.e. `introduction`)
  - `title` - Friendly document title, used to display the page title (not including the site's name); should be ≤ 40 chars (i.e. `An introduction to Begin`)
  - `description` - A brief description of the document, used in `<meta name="description" content="${description}"/>`; should be ≤ 300 chars.
  - `github` - GitHub URL of the corresponding markdown file, should someone want to send a pull request
  - `nextDoc` (optional) - Complete relative path to the next document (i.e. `/en/getting-started/quickstart/`)
  - `nextTitle` (optional) - Friendly document title of the next document (i.e. `Quickstart`)
  - `sections` - Array containing document's section objects (should map to only H2s, i.e. `## What is Begin?`); each section object contains the following keys:
    - `anchor` - Named anchor from the generated markdown (i.e. `#what-is-begin-`, note: trailing punctuation may result in trailing dashes, where `## Hi!` produces an `anchor` of `#hi-`)
    - `name` - Name of the document section; should match what's in the markdown document

### Example ToC

```javascript
[
  {
    "cat": "dog-rates",
    "catTitle": "Rating dogs",
    "docs": [
      {
        "doc": "how-to-rate-dogs",
        "title": "How to rate dogs",
        "description": "An introduction to rating dogs",
        "github": "https://github.com/smallwins/docs.begin.com/blob/master/src/shared/docs/en/dog-rates/how-to-rate-dogs.md",
        "nextDoc": "/en/dog-rates/dog-rating-scales/",
        "nextTitle": "Dog-rating scales",
        "sections": [
          {
            "anchor": "#they-re-all-good-dogs",
            "name": "They're all good dogs"
          }
        ]
      }
    ]
  }
]
```
