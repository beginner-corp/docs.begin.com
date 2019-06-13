@app
begin-docs

@aws
region us-west-1
profile smallwins

@domain
docs.begin.com

@http
get /
get /guides
get /guides/:guide
get /css/:page
get /modules/:type/:module
get /robots.txt
get /:lang/:cat/:doc

# these used to be here to forward home if any path parts were missing
# TODO just handle this in the renderer
# get /:lang
# get /:lang/:cat

@static
staging begin-docs-staging
production begin-docs

@plugins
architect/arc-plugin-node-prune
