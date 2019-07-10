// As document names/paths change, add them to the forwards obj
//   - key is the *old path*, value is the *new path* you want to forward to
//   - don't chain forwards; if a an old path forwards to a path that also forwards to a new path, update both to forward to the same path
//   - note: must include root slash
module.exports = {
  // example
  // '/en/old/busted': '/en/new/hotness'
  '/en/getting-started/quickstart': '/en/guides/quickstart',
  '/en/routes-functions/creating-new-routes': '/en/functions/creating-new-functions',
  '/en/routes-functions/sessions': '/en/functions/sessions',
  '/en/routes-functions/html-routes': '/en/functions/html-routes',
  '/en/routes-functions/json-routes': '/en/functions/json-routes',
  '/en/routes-functions/xml-routes': '/en/functions/xml-routes',
  '/en/routes-functions/css-routes': '/en/functions/css-routes',
  '/en/routes-functions/javascript-routes': '/en/functions/javascript-routes',
  '/en/routes-functions/text-routes': '/en/functions/text-routes',
}
