# Begin documentation

[![GitHub CI status](https://github.com/smallwins/docs.begin.com/workflows/Node%20CI/badge.svg)](https://github.com/smallwins/docs.begin.com/actions?query=workflow%3A%22Node+CI%22)


## Getting started

Intialize the repo with: `npm i && npx hydrate`

From there: `npm start` should get you going!

Note: You might run into this error after running `npm start`: `"Warning: missing or invalid AWS credentials file"`. If so, it's because the Begin docs are checking for AWS credentials.

To correct that error, follow these steps:

1. Create a `.aws` directory.
`mkdir /Users/YOUR_USERNAME/.aws`
2. Create a file for the credentials.
`touch /Users/YOUR_USERNAME/.aws/credentials`
3. Open your text editor the following to your credentials file:
```
[smallwins]
aws_access_key_id=xxx
aws_secret_access_key=xxx
```

## Authoring documents

Documents are found in `src/shared/docs/{lang}/{cat}/{doc}`

Category and document names are used as IDs, so as you might expect, category names must be unique within each language, and document names must be unique within each category.

Category names are the same as their folder names, and document names are the same as their filenames. The filename convention for a document is simply: `{doc}.md`

Category and document names should be dasherized.

Thus, to create a new document available at `https://docs.begin.com/foo/bar-baz`, create the following folder and file:
- `src/shared/docs/en/foo/bar-baz.md`

Documents that appear in the file tree but not in the table of contents will be accessible as a preview by directly accessing their URL. (This may be helpful for checking in new docs that may not be ready for public consumption yet.)


## Document metadata

Each language folder contains a table of contents JSON file at its root (`src/shared/docs/{language}/ToC.json`). This ToC file is used to populate the nav tree, documents, and their metadata.

The following keys are required (unless stated otherwise):

- `cat` - Category name; example: `getting-started`
- `catTitle` - Friendly category title; example: `Getting Started`
- `docs` - Array containing category's document objects; each document object contains the following keys:
  - `doc` - Document name; example:  `an-introduction-to-cloud-functions`
  - `title` - Friendly document title, used to display the page title (not including the site's name); should be ≤ 40 chars; sentence casing is preferable; example: `An introduction to cloud functions`
  - `description` - A brief description of the document display in document metadata (such as `<meta name="description" content="${description}"/>`); should be ≤ 300 chars; example: `An introductory guide to building with cloud functions on Begin`
  - `github` - GitHub URL of the corresponding markdown file, should someone want to send a pull request
  - `nextDoc` (optional) - Complete relative path to the next document; example: `/en/getting-started/quickstart/`
  - `nextTitle` (optional) - Friendly document title of the next document; example: `Quickstart`
  - `sections` - Array containing document's section objects (should map to only H2s, i.e. `## What is Begin?`); each section object contains the following keys:
    - `anchor` - Named anchor from the generated markdown; example: `#what-is-begin-` (note: trailing punctuation in the doc may result in trailing dashes in the anchor, i.e. `## Hi!` produces an `anchor` of `#hi-`)
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
