@app
begin-help

@html
get /
# get /:lang                      # just here to forward home if any leaf nodes are missing
# get /:lang/:cat            # just here to forward home if any leaf nodes are missing
get /:lang/:cat/:doc

@css
/css/app.css
/css/styleguide.css
# @todo would be nice to combine these into a single request, but until that is resolved this is doing a file read

# @static
# staging begin-docs-staging
# production begin-docs
