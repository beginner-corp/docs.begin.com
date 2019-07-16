@app
begin-docs

@aws
region us-west-1
profile smallwins

@domain
docs.begin.com

@http
get /
get /css/:page
get /modules/:type/:module
get /robots.txt
get /:lang/:cat/:doc
get /:lang/:cat

# get /:lang

@static
staging begin-docs-staging
production begin-docs
fingerprint true

@plugins
architect/arc-plugin-node-prune
