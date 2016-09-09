//
// Boot application
//
+jQuery(function() {
  action = document.body.getAttribute('data-action')
  if (App[action]) App[action].call()
})
