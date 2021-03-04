$().ready(() => {
   "use strict";

   /* Remove fixed background effect for Safari */
   var is_safari = navigator.userAgent.indexOf("Safari") > -1;
   if (is_safari) {
      $('.wallpapper').css("background-attachment", "scroll");
   }

   /* Show and Hide mobile menu*/
   const burger = $(".burger");
   const burgerMenu = $(".burger-menu");
   const mobileMenu = $(".mobile-menu");
   const closeMenu = $(".close-menu");

   burger.mouseenter(() => {
      let lineas = $(".linea");
      for (let i = 0; i < lineas.length; i++) {
         lineas[i].classList.add("line-colour");
      }
   });

   burger.mouseleave(() => {
      let lineas = $(".linea");
      for (let i = 0; i < lineas.length; i++) {
         lineas[i].classList.remove("line-colour");
      }
   });

   /* Add rotate effect to menu burger lines */
   burgerMenu.click(() => {
      if (mobileMenu.hasClass("show-menu")) {
         removeEffect();
      } else {
         mobileMenu.addClass("show-menu");
         $(".line-one").addClass("line-1");
         $(".line-two").addClass("line-2");
         $(".line-three").addClass("line-3");
      }
   });

   closeMenu.click(() => {
      removeEffect();
   });
   /* Remove rotate effects to menu burger lines */
   function removeEffect() {
      mobileMenu.removeClass("show-menu");
      $(".line-one").removeClass("line-1");
      $(".line-two").removeClass("line-2");
      $(".line-three").removeClass("line-3");
   }

   let nav = $("nav");
   let frs = $(".frs");

   // Scroll functions
   $(document).scroll(function () {
      let separator = $(".separator").offset().top;
      let position = $(window).scrollTop() + 120;

      // Change navbar to white-bg and black-color
      if (position > separator) {
         nav.addClass("bg-white shadow black-text");
         $(".a-nav").addClass("black");
         frs.css("display", "inline");
      } else {
         nav.removeClass("bg-white shadow");
         $(".a-nav").removeClass("black");
         frs.css("display", "none");
      }

      // GOTOP Button Hide/Show animation class
      var height = $(window).scrollTop();
      if (height > 600) {
         $("#goTop").addClass("move");
      } else {
         $("#goTop").removeClass("move");
      }
   });

   // Set transparent NAV only at index.*
   let url = $(location).attr("href");
   let page = url.split("/");
   let separator = $(".separator").offset().top;

   page = page[page.length - 1].split(".")[0];

   if (page != "index" && page != "") {
      nav.addClass("bg-white shadow black-text");
      $(".a-nav").addClass("black");
      frs.css("display", "inline");
   }

   if (page == "index" && (document.body.getBoundingClientRect().y * -1) > separator - 120) {
      nav.addClass("bg-white shadow black-text");
      $(".a-nav").addClass("black");
      frs.css("display", "inline");
   }

   // GoTop movement to TOP
   $("#goTop").click(function (event) {
      event.preventDefault();
      $("html, body").animate({
         scrollTop: 0
      }, 1300);
   });

   // Hover to projects images
   let proyectos = $(".project");

   for (let i = 0; i < proyectos.length; i++) {
      proyectos[i].addEventListener("mouseenter", () => {
         proyectos[i].classList.add("sombra");
         proyectos[i].children[0].classList.add("filteroff");
      });
      proyectos[i].addEventListener("mouseleave", () => {
         proyectos[i].classList.remove("sombra");
         proyectos[i].children[0].classList.remove("filteroff");
      });
   }

   // form animation line
   const nameInput = $("#input-name");
   const focusName = $(".focus-name");

   const emailInput = $("#input-email");
   const focusEmail = $(".focus-email");

   const spanUser = $(".focus-text-name");
   const spanEmail = $(".focus-text-email");

   nameInput.focus(() => {
      focusName.addClass("focus-dos");
      spanUser.addClass("focus-dos-text");
   });

   nameInput.blur(() => {
      focusName.removeClass("focus-dos");
      if (nameInput[0].value == 0) {
         spanUser.removeClass("focus-dos-text");
      }
   });

   emailInput.focus(() => {
      focusEmail.addClass("focus-dos");
      spanEmail.addClass("focus-dos-text");
   });

   emailInput.blur(() => {
      focusEmail.removeClass("focus-dos");

      if (emailInput[0].value == 0) {
         spanEmail.removeClass("focus-dos-text");
      }
   });
});