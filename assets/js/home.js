//
// Home
//
;App.home = function() {

  // Navbar brand
  // ============

  +function() {
    var win         = $(window),
        brand       = $('.navbar-brand-box'),
        logo        = $('#logo'),
        navHeight   = $('.navbar').outerHeight(),
        brandHeight = brand.outerHeight()

    // Hide brand
    brand.css('paddingTop', '32px')

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
  }()


  // Contact form
  // ============

  Contact = function () {
    var parent = Resource, proto = Contact.prototype = Object.create(parent.prototype)

    function Contact (data) {
      parent.apply(this, arguments)  // super
      this.url = 'https://formspree.io/' + App.secrets.vaeromInfoEmail
      this.data['_cc'] = App.secrets.matiasEmail + ', ' + App.secrets.nicolasEmail
    }

    proto.validate = function (data) {
      this.validatePresence('name')
      this.validateLength('name', 3, 200)
      this.validatePresence('_replyto')
      this.validateFormat('_replyto', Resource.emailRegex)
      this.validatePresence('comment')
    }

    return Contact
  }()

  var form = new Form($('.contact-form'), Contact)
};
