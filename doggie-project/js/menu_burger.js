'use strict'

// !Проверка с какого устройства пришел человек
const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows()
      );
   }
};

if (isMobile.any()) {
   document.body.classList.add('_touch');
   let menuExpands = document.querySelectorAll('.menu-header__item_expand');


   if (menuExpands.length > 0) {
      for (let i = 0; i < menuExpands.length; i++) {
         const menuExpand = menuExpands[i];
         menuExpand.addEventListener('click', function (e) {
            menuExpand.classList.toggle('_active');
         });
      }
   }
} else {
   document.body.classList.add('_pc');
}

// !!Menu-Burger
const menuHeader = document.querySelector('.menu-header');
const menuBody = document.querySelector('.menu-header__body');
const blueMenu = document.querySelector('.header__information');
const iconMenu = document.querySelector('.menu-header__icon');

if (iconMenu) {
   iconMenu.addEventListener('click', function (event) {

      document.body.classList.toggle('_lock');
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
      blueMenu.classList.toggle('_active');
      // descriptionBody.classList.toggle('_lock');

   });
}
// !! smooth scroll
// const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

// if (menuLinks.length > 0) {
//    menuLinks.forEach(menuLink => {
//       menuLink.addEventListener('click', onMenuLinkClick);
//    });
// }

// function onMenuLinkClick(event) {
//    const menuLink = event.target;
//    console.log(menuLink.dataset.goto);
//    const goTo = menuLink.dataset.goto;

//    if (goTo && document.querySelector(goTo)) {
//       const gotoBlock = document.querySelector(goTo);
//       const headerHeigth = document.querySelector('header').offsetHeight;
//       const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - headerHeigth;

//       if (iconMenu.classList.contains('_active')) {
//          document.body.classList.remove('_lock');
//          iconMenu.classList.remove('_active');
//          menuBody.classList.remove('_active');
//          descriptionBody.classList.remove('_lock');

//       }

//       window.scrollTo({
//          top: gotoBlockValue,
//          behavior: 'smooth'
//       });
//       event.preventDefault();
//    }
// }



