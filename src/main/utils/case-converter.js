'use strict'

// https://github.com/alexnm/json-style-converter/blob/master/es5/index.js

var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) { return typeof obj } : function (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj }

function camelToSnakeCase (obj) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}

  if (!isSimpleObject(options)) {
    return obj // avoiding String and other custom objects
  }

  if (typeof obj === 'string') {
    return camelToSnake(obj, options)
  }

  return traverse(obj, camelToSnake, options)
}

function traverse (obj, transform, options) {
  if (!obj) {
    return obj
  }

  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    return obj // must be an object
  }

  if (Array.isArray(obj)) {
    return obj.map(function (el) {
      return traverse(el, transform, options)
    })
  }

  if (!isSimpleObject(obj)) {
    return obj // avoiding String and other custom objects
  }

  return Object.keys(obj).reduce(function (acc, key) {
    var convertedKey = transform(key, options)
    acc[convertedKey] = traverse(obj[key], transform, options)
    return acc
  }, {})
}

function isSimpleObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

function camelToSnake (str, _ref) {
  var digitsAreUpperCase = _ref.digitsAreUpperCase

  var firstPass = str.replace(/[a-z][A-Z]/g, function (letters) {
    return letters[0] + '_' + letters[1].toLowerCase()
  })
  if (digitsAreUpperCase) {
    return firstPass.replace(/[0-9]/g, function (digit) {
      return '_' + digit
    })
  }

  return firstPass
}

export default camelToSnakeCase
