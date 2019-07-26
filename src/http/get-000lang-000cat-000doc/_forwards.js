/**
 * As document names/paths change, add them to the forwards obj
 *   - key is the *old path*, value is the *new path* you want to forward to
 *   - don't chain forwards; if a an old path forwards to a path that also forwards to a new path, update both to forward to the same path
 *   - note: must include root slash
 */
module.exports = {
  /**
   * Example:
   *   '/en/old/busted': '/en/new/hotness'
   */
  '/en/meta/about':                           '/en/background/about',
  '/en/getting-started/working-locally':      '/en/guides/introduction',
  '/en/getting-started/quickstart':           '/en/guides/quickstart',
  '/en/routes-functions/creating-new-routes': '/en/http-functions/provisioning',
  '/en/routes-functions/sessions':            '/en/http-functions/sessions',
  // Legacy docs
  '/en/functions/html-routes':                '/en/http-functions/provisioning',
  '/en/functions/json-routes':                '/en/http-functions/provisioning',
  '/en/functions/xml-routes':                 '/en/http-functions/provisioning',
  '/en/functions/css-routes':                 '/en/http-functions/provisioning',
  '/en/functions/javascript-routes':          '/en/http-functions/provisioning',
  '/en/functions/text-routes':                '/en/http-functions/provisioning',
  '/en/routes-functions/html-routes':         '/en/http-functions/provisioning',
  '/en/routes-functions/json-routes':         '/en/http-functions/provisioning',
  '/en/routes-functions/xml-routes':          '/en/http-functions/provisioning',
  '/en/routes-functions/css-routes':          '/en/http-functions/provisioning',
  '/en/routes-functions/javascript-routes':   '/en/http-functions/provisioning',
  '/en/routes-functions/text-routes':         '/en/http-functions/provisioning',
}
