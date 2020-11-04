Existing applications can incrementally adopt serverless using the following techniques.

## Proxy anything

Opt into proxying another URL on the internet by modifying `app.arc` and adding `@proxy`:

```
@proxy
testing https://qa.example.com
staging https://qa.example.com
production https://example.com
```
> `@proxy` must declare valid http or https URLs for all developer environments

Additional routes defined by `@http` will win but otherwise all traffic will proxy to the URLs configured. This is a good way to migrate any web accessible application to serverless.

## Express apps

TBD

## Static apps

TBD
