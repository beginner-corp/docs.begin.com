export default function joinClasses () {
  return Array.prototype.filter.call(arguments, function (s) {
    return s && typeof s === 'string'
  }).join(' ').trim()
}
