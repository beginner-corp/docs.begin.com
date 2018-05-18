@app
begin-help

@html
get /
get /:lang                # just here to forward home
get /:lang/:section       # just here to forward home
get /:lang/:section/:doc

# @static
# staging begin-docs-staging
# production begin-docs
