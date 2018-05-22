@app
begin-help

@html
get /
get /:language                      # just here to forward home if any leaf nodes are missing
get /:language/:category            # just here to forward home if any leaf nodes are missing
get /:language/:category/:document

# @static
# staging begin-docs-staging
# production begin-docs
