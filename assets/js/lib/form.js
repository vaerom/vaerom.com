;Form = function () {
  var proto = Form.prototype

  function Form (form, resourceClass) {
    var self = this
    self.form = form
    submitBtn = $('.btn', form),

    form.on('submit', function(e) {
      e.preventDefault()
      submitBtn.prop('disabled', true)
      self.removeErrors()
      self.notify('info')

      resource = new resourceClass(self.data())
      resource.save(function(saved, errors) {
        self.notify(saved ? 'success' : 'danger')
        submitBtn.prop('disabled', false)
        if (errors) self.showErrors(errors)
        if (saved)  form[0].reset()
      })
    })
  }


  // _____ Public _____
  //

  proto.data = function () {
    // Convert formData array to object
    var pair, i = 0, data = {}, formData = this.form.serializeArray()
    while(pair = formData[i++]) data[pair.name] = pair.value
    return data
  }

  proto.showErrors = function (errors) {
    I18n = I18n || {}

    for (var name in errors) {
      if (! errors.hasOwnProperty(name)) continue
      var fieldErrors = errors[name]
      var field = $('[name=' + name + ']', this.form)
      if (! field[0]) continue

      for (var handle, i=0; handle = fieldErrors[i]; i++)
        if (I18n[handle]) fieldErrors[i] = I18n[handle]

      var p = document.createElement('p')
      p.className = 'form-control-feedback'
      p.innerHTML = fieldErrors.join(', ')

      var labelParent = field.parents('label')
      var target = labelParent.length ? labelParent : field
      target.after(p).parents('.form-group').addClass('has-danger')
    }
  }

  proto.removeErrors = function () {
    $('.has-danger', this.form).removeClass('has-danger')
    $('.form-control-feedback', this.form).remove()
  }

  proto.notify = function (type) {
    $('.alert', this.form).hide()
    $('.alert-' + type, this.form).show()
  }

  return Form
}();
