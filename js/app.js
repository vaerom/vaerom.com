+function(e,t,o){App={secrets:{vaeromPhone:["+54 ","261 ","6689","240"].join(""),vaeromInfoEmail:["in","fo@","vaerom.","com"].join(""),vaeromCoursesEmail:["cur","sos@","vaerom.","com"].join(""),matiasEmail:["mat","ias@","vaerom.","com"].join(""),nicolasEmail:["nico","las@","vaerom.","com"].join("")}},I18n={blank:"no puede estar en blanco",invalid:"formato incorrecto",too_short:"es demasiado corto",too_long:"es demasiado largo"},Resource=function(){function e(e){this.url="",this.data=e,this.errors={},this.errorsCount=0}var t=e.prototype;return e.phoneRegex=/^[0-9()-+\s]+$/i,e.emailRegex=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,t.valid=function(){return this.errors={},this.errorsCount=0,this.validate(this.data),!this.errorsCount},t.validate=function(){},t.addError=function(e,t){this.errors[e]||(this.errors[e]=[]),this.errors[e].push(t),this.errorsCount++},t.validatePresence=function(e){this.data[e]||this.addError(e,"blank")},t.validateLength=function(e,t,o){var r=this.data[e];"number"==typeof t&&r.length<t&&this.addError(e,"too_short"),"number"==typeof o&&r.length>o&&this.addError(e,"too_long")},t.validateFormat=function(e,t){var o=this.data[e];t.test(o)||this.addError(e,"invalid")},t.save=function(e){if(!this.valid())return e(!1,this.errors);var t=o.ajax({url:this.url,method:"POST",dataType:"json",data:this.data});t.done(function(){e(!0)}),t.fail(function(){e(!1,{base:["failed"]})})},e}(),Form=function(){function e(e,t){var r=this;r.form=e,submitBtn=o(".btn",e),e.on("submit",function(o){o.preventDefault(),submitBtn.prop("disabled",!0),r.removeErrors(),r.notify("info"),resource=new t(r.data()),resource.save(function(t,o){r.notify(t?"success":"danger"),submitBtn.prop("disabled",!1),o&&r.showErrors(o),t&&e[0].reset()})})}var r=e.prototype;return r.data=function(){for(var e,t=0,o={},r=this.form.serializeArray();e=r[t++];)o[e.name]=e.value;return o},r.showErrors=function(e){I18n=I18n||{};for(var r in e)if(e.hasOwnProperty(r)){var a=e[r],n=o("[name="+r+"]",this.form);if(n[0]){for(var i,s=0;i=a[s];s++)I18n[i]&&(a[s]=I18n[i]);var c=t.createElement("p");c.className="form-control-feedback",c.innerHTML=a.join(", ");var l=n.parents("label"),m=l.length?l:n;m.after(c).parents(".form-group").addClass("has-danger")}}},r.removeErrors=function(){o(".has-danger",this.form).removeClass("has-danger"),o(".form-control-feedback",this.form).remove()},r.notify=function(e){o(".alert",this.form).hide(),o(".alert-"+e,this.form).show()},e}(),+jQuery(function(e){e("[data-scroll]").on("click",function(t){t.preventDefault();var o=e(e(this).attr("href"));o.length&&e.scrollTo(o,200)}),e(".alert .close").on("click",function(t){e(this).parent().fadeOut()}),e(".vaerom-info-email").attr("href","mailto:"+App.secrets.vaeromInfoEmail).append(App.secrets.vaeromInfoEmail),e(".vaerom-courses-email").attr("href","mailto:"+App.secrets.vaeromCoursesEmail).append(App.secrets.vaeromCoursesEmail),e(".vaerom-phone").append(App.secrets.vaeromPhone)}),App.home=function(){+function(){function t(){var e,t,o=n.height();e=r.scrollTop()+i-n.offset().top,0>e&&(e=0),e>o&&(e=o),t=Math.round(s*(1-e/o)),a.css({paddingTop:t})}var r=o(e),a=o(".navbar-brand-box"),n=o("#logo"),i=o(".navbar").outerHeight(),s=a.outerHeight();a.css("paddingTop","32px"),r.on("scroll",t),t()}(),Contact=function(){function e(e){t.apply(this,arguments),this.url="https://formspree.io/"+App.secrets.vaeromInfoEmail,this.data._cc=App.secrets.matiasEmail+", "+App.secrets.nicolasEmail}var t=Resource,o=e.prototype=Object.create(t.prototype);return o.validate=function(e){this.validatePresence("name"),this.validateLength("name",3,200),this.validatePresence("_replyto"),this.validateFormat("_replyto",Resource.emailRegex),this.validatePresence("comment")},e}();new Form(o(".contact-form"),Contact)},App.flightCourse=function(){Postulation=function(){function e(e){t.apply(this,arguments),this.url="https://formspree.io/"+App.secrets.vaeromCoursesEmail,this.data._cc=App.secrets.matiasEmail+", "+App.secrets.nicolasEmail}var t=Resource,o=e.prototype=Object.create(t.prototype);return o.validate=function(e){var t=this;t.validatePresence("firstname"),t.validateLength("firstname",3,200),t.validatePresence("lastname"),t.validateLength("lastname",3,200),t.validatePresence("ocupation"),t.validateLength("ocupation",3,400),t.validatePresence("_replyto"),t.validateFormat("_replyto",Resource.emailRegex),t.validatePresence("phone"),t.validateFormat("phone",Resource.phoneRegex)},e}();new Form(o(".postulation-form"),Postulation)},+jQuery(function(){action=t.body.getAttribute("data-action"),App[action]&&App[action].call()})}(window,document,jQuery);