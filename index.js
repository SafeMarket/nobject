const _ = require('lodash')

function ValueWrapper(value) {
  this.value = value
}

ValueWrapper.prototype.toJSON = function (){
  return this.value
}

function Nobject (){
  this.values = {}
}
Nobject.ValueWrapper = ValueWrapper

Nobject.prototype.set = function set (args, value){
  
  let values = this.values

  _.forEach(args, (arg, index) => {
    
    if (index === args.length - 1) {
      values[arg] = new ValueWrapper(value)
      return false
    }

    if (!values[arg]) {
      values[arg] = {}
    }

    values = values[arg]

  }) 
}

Nobject.prototype.get = function get (args) {

  let value = this.values

  _.forEach(args, (arg, index) => {
    value = value[arg]

    if (typeof value === "undefined") {
      return false
    }

  })

  if (value instanceof ValueWrapper) {
    return value.value
  }

  return value

}

Nobject.prototype.forEach = function forEach (doForEach) {

  function forEach(object, keys) {
    for (const key in object) {
      const _keys = keys.slice()
      const _object = object[key]
      _keys.push(key)
      if (_object instanceof ValueWrapper) {
        if (doForEach(_keys, _object.value) === false) {
          return false
        }
      } else {
        if (forEach(_object, _keys) === false) {
          return false
        }
      }
    }
  }

  forEach(this.values, [])

}

Nobject.prototype.toJSON = function(){
  return JSON.stringify(this.values)
}

module.exports = Nobject