;Resource = function () {
  var proto = Resource.prototype
  Resource.phoneRegex = /^[0-9()-+\s]+$/i
  Resource.emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  function Resource (data) {
    this.url = ''
    this.data = data
    this.errors = {}
    this.errorsCount = 0
  }


  // _____ Public _____
  //

  proto.valid = function () {
    this.errors = {}
    this.errorsCount = 0
    this.validate(this.data)
    return !this.errorsCount
  }

  proto.validate = function () { /* Should be overridden by subclasses */ }

  proto.addError = function (name, handle) {
    if (! this.errors[name]) this.errors[name] = []
    this.errors[name].push(handle)
    this.errorsCount++
  }

  proto.validatePresence = function (name) {
    if (! this.data[name]) this.addError(name, 'blank')
  }

  proto.validateLength = function (name, min, max) {
    var v = this.data[name]
    if (typeof min == 'number' && v.length < min) this.addError(name, 'too_short')
    if (typeof max == 'number' && v.length > max) this.addError(name, 'too_long')
  }

  proto.validateFormat = function (name, regex) {
    var value = this.data[name]
    if (! regex.test(value)) this.addError(name, 'invalid')
  }

  proto.save = function (callback) {
    if (! this.valid()) return callback(false, this.errors)

    var xhr = $.ajax({
      url: this.url,
      method: 'POST',
      dataType: 'json',
      data: this.data
    })

    xhr.done(function() { callback(true) })
    xhr.fail(function() { callback(false, { base: ['failed'] }) })
  }

  return Resource
}();
