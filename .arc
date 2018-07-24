@app
begin-docs

@html
get /
get /:lang/:cat/:doc
# these used to be here to forward home if any path parts were missing
# TODO just handle this in the renderer
# get /:lang
# get /:lang/:cat

@css
/css/:page

@static
staging begin-docs-staging
production begin-docs

@aws
region us-west-1
profile smallwins

@domain
docs.begin.com
