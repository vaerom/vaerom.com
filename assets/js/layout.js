//
// Layout
//
+jQuery(function($) {

  // Scrolls
  // =======

  $("[data-scroll]").on('click', function(e) {
    e.preventDefault()
    var target = $( $(this).attr("href") )
    if (target.length) $.scrollTo(target, 200)
  })


  // Alerts
  // ========

  // Fade alerts on close
  $('.alert .close').on('click', function(e) { $(this).parent().fadeOut() })


  // Secrets
  // =======

  // Info email
  $('.vaerom-info-email')
    .attr('href', 'mailto:' + App.secrets.vaeromInfoEmail)
    .append(App.secrets.vaeromInfoEmail)

  // Courses email
  $('.vaerom-courses-email')
    .attr('href', 'mailto:' + App.secrets.vaeromCoursesEmail)
    .append(App.secrets.vaeromCoursesEmail)

  // Phone
  $('.vaerom-phone').append(App.secrets.vaeromPhone)

})
