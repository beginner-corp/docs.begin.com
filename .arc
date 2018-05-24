@app
begin-help

@html
get /
get /:lang                      # just here to forward home if any leaf nodes are missing
get /:lang/:cat            # just here to forward home if any leaf nodes are missing
get /:lang/:cat/:doc

@css
/docs.css

# @static
# staging begin-docs-staging
# production begin-docs
