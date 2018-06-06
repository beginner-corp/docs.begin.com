@app
begin-docs

@html
get /
# get /:lang            # just here to forward home if any leaf nodes are missing
# get /:lang/:cat       # just here to forward home if any leaf nodes are missing
get /:lang/:cat/:doc

@css
/css/:page

# @static
# staging begin-docs-staging
# production begin-docs

@aws
region us-west-1

@domain
docs.begin.com
