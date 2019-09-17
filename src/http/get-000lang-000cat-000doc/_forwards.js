/**
 * As document names/paths change, add them to the forwards obj
 *   - key is the *old path*, value is the *new path* you want to forward to
 *   - don't chain forwards; if a an old path forwards to a path that also forwards to a new path, update both to forward to the same path
 *   - note: must include root slash
 */
module.exports = {
/* -- Old route --                             -- New route -- */
  '/en/meta/about':                           '/en/background/about',
  '/en/getting-started/working-locally':      '/en/guides/quickstart',
  '/en/getting-started/quickstart':           '/en/guides/quickstart',
  '/en/functions/creating-new-functions':     '/en/http-functions/provisioning',
  '/en/functions/sessions':                   '/en/http-functions/sessions',
  '/en/functions/http':                       '/en/http-functions/api-reference',
  '/en/functions/html-routes':                '/en/http-functions/api-reference',
  '/en/functions/json-routes':                '/en/http-functions/api-reference',
  '/en/functions/xml-routes':                 '/en/http-functions/api-reference',
  '/en/functions/css-routes':                 '/en/http-functions/api-reference',
  '/en/functions/javascript-routes':          '/en/http-functions/api-reference',
  '/en/functions/text-routes':                '/en/http-functions/api-reference',
  '/en/routes-functions/creating-new-routes': '/en/http-functions/provisioning',
  '/en/routes-functions/sessions':            '/en/http-functions/sessions',
  '/en/routes-functions/html-routes':         '/en/http-functions/api-reference',
  '/en/routes-functions/json-routes':         '/en/http-functions/api-reference',
  '/en/routes-functions/xml-routes':          '/en/http-functions/api-reference',
  '/en/routes-functions/css-routes':          '/en/http-functions/api-reference',
  '/en/routes-functions/javascript-routes':   '/en/http-functions/api-reference',
  '/en/routes-functions/text-routes':         '/en/http-functions/api-reference',
}
