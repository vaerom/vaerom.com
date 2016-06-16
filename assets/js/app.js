+function(window, document, $) {

  // ____________________
  //
  //       Cache
  // ____________________
  //

  var errors      = {},
      errorsCount = 0,
      i18n        = window.i18n || {},
      emailRegex  = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

  var secrets = {
    vaeromPhone:  ['+54 ', '261 ', '6689240'],
    vaeromEmail:  ['info', '@', 'vaerom.', 'com'],
    matiasEmail:  ['mat', 'ias',  '@', 'vaerom.', 'com'],
    nicolasEmail: ['nico', 'las', '@', 'vaerom.', 'com']
  }

  for (k in secrets) secrets[k] = secrets[k].join('')



  // ____________________
  //
  //       Helpers
  // ____________________
  //

  function addError(name, handle) {
    if (! errors[name]) errors[name] = []
    errors[name].push(i18n[handle])
    errorsCount++
  }

  function validatePresence(name, value) {
    if (! value) addError(name, 'blank')
  }

  function validateLength(name, value, min, max) {
    if (typeof min == 'number' && value.length < min)
      addError(name, 'too_short')

    if (typeof max == 'number' && value.length > max)
      addError(name, 'too_long')
  }

  function validateFormat(name, value, regex) {
    if (! regex.test(value)) addError(name, 'invalid')
  }

  function showErrors(form, errors) {
    var name, field

    for (name in errors) {
      if (! errors.hasOwnProperty(name)) continue

      p = document.createElement('p')
      p.className = 'text-help'
      p.innerHTML = errors[name].join(', ')

      field = $('[name=' + name + ']', form).after(p)
      field.parents('.form-group').addClass('has-danger')
    }
  }

  function removeErrors(form) {
    $('.has-danger', form).removeClass('has-danger')
    $('.text-help', form).remove()
  }

  function notify(form, type) {
    $('.alert', form).hide()
    $('.alert-' + type, form).show()
  }



  // ____________________
  //
  //         DOM
  // ____________________
  //

  // Scrolls
  // =======

  $(function() {
    $("[data-scroll]").on('click', function(e) {
      e.preventDefault()
      var target = $( $(this).attr("href") )
      if (target.length) $.scrollTo(target, 200)
    })
  })



  // Navbar brand
  // ============

  $(function() {
    var win         = $(window),
        brand       = $('.navbar-brand-box'),
        logo        = $('#logo'),
        navHeight   = $('.navbar').outerHeight(),
        brandHeight = brand.outerHeight()

    function scrollBrand() {
      var logoHeight = logo.height(), covered, paddingTop

      covered = win.scrollTop() + navHeight - logo.offset().top
      if (covered < 0)          covered = 0
      if (covered > logoHeight) covered = logoHeight

      paddingTop = Math.round(brandHeight * (1 - covered / logoHeight))
      brand.css({ paddingTop: paddingTop })
    }

    win.on('scroll', scrollBrand)
    scrollBrand()
  })


  // Secrets
  // =======

  $(function() {
    var email, phone

    email = document.getElementById('vaerom-email')
    email.href = 'mailto:' + secrets.vaeromEmail
    email.innerHTML = secrets.vaeromEmail

    phone = document.getElementById('vaerom-phone')
    phone.innerHTML = secrets.vaeromPhone
  })


  // Contact form
  // ============

  $(function() {
    var form = $('.contact-form'),
        btn  = $('.btn', form)

    function valid(formData) {
      // Reset errors
      errors = {}
      errorsCount = 0

      // Convert formData array to object
      var pair, i=0, data = {}
      while(pair = formData[i++]) data[pair.name] = pair.value

      // Validations
      validatePresence('name', data['name'])
      validateLength('name', data['name'], 3, 200)
      validatePresence('_replyto', data['_replyto'])
      validateFormat('_replyto', data['_replyto'], emailRegex)
      validatePresence('comment', data['comment'])

      // Valid?
      return !errorsCount
    }

    function submitForm(formData) {
      notify(form, 'info')
      btn.prop('disabled', true)

      // Add "carbon copy" addresses
      var cc = [secrets.nicolasEmail, secrets.matiasEmail]
      formData.push({name: '_cc', value: cc.join(',')})

      var xhr = $.ajax({
        url: 'https://formspree.io/' + secrets.vaeromEmail,
        method: 'POST',
        dataType: 'json',
        data: formData
      })

      xhr.done(function()   { notify(form, 'success') })
      xhr.fail(function()   { notify(form, 'danger') })
      xhr.always(function() { btn.prop('disabled', false) })
    }

    form.on('submit', function(e) {
      e.preventDefault()
      removeErrors(form)
      var formData = form.serializeArray()
      if(! valid(formData)) return showErrors(form, errors)
      submitForm(formData)
    })

    // Fade alerts on close
    $('.alert .close').on('click', function(e) { $(this).parent().fadeOut() })
  })
}(window, document, jQuery)
