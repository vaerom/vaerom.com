//
// Flight course
//
;App.flightCourse = function() {

  // Postulation form
  // ================

  Postulation = function() {
    var parent = Resource, proto = Postulation.prototype = Object.create(parent.prototype)

    function Postulation (data) {
      parent.apply(this, arguments)  // super
      this.url = 'https://formspree.io/' + App.secrets.vaeromCoursesEmail
      this.data['_cc'] = App.secrets.matiasEmail + ', ' + App.secrets.nicolasEmail
    }

    proto.validate = function (data) {
      var self = this

      self.validatePresence('firstname')
      self.validateLength('firstname', 3, 200)

      self.validatePresence('lastname')
      self.validateLength('lastname', 3, 200)

      self.validatePresence('ocupation')
      self.validateLength('ocupation', 3, 400)

      self.validatePresence('_replyto')
      self.validateFormat('_replyto', Resource.emailRegex)

      self.validatePresence('phone')
      self.validateFormat('phone', Resource.phoneRegex)
    }

    return Postulation
  }()

  var form = new Form($('.postulation-form'), Postulation)
};
