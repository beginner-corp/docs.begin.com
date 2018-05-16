# Begin documentation!

## Getting started

`npm i && npm start` should get you going!


## Document heirarchy

Documents and views are shared across the site, and are found in `/src/shared/docs/{language}/{section name}/{doc name}`

Each doc must possess two files:
- `{doc name}-content.md` - Markdown of doc's content to be used in `<body>`
- `{doc name}-meta.json` - JSON of doc's metadata to be used in `<head>`, including `title` and `description`.

Thus, to create a new document available at: `https://docs.begin.com/foo/bar`, create the following two files:
- `/src/shared/docs/en/foo/bar-content.md`
- `/src/shared/docs/en/foo/bar-meta.json`
