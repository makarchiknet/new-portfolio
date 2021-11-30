window.addEventListener('DOMContentLoaded', function () {
   const container = document.querySelector('.container');
   const directionBtn = document.querySelector('.change-direction');
   const controlsBtn = document.querySelectorAll('.control');
   const sidebarItem = document.querySelectorAll('.sidebar-item');
   const mainSlide = document.querySelector('.main-slide');
   const slides = mainSlide.querySelectorAll('div');
   const height = container.clientHeight;
   const width = container.clientWidth;

   let step = 0;
   let step2 = 3;
   let myEvent = true;

   function changeDirection() {
      if (directionBtn.classList.contains('vertical')) {
         directionBtn.classList.remove('vertical');
      } else {
         directionBtn.classList.add('vertical');
      }
      controlsBtn.forEach((item) => {
         if (item.classList.contains('invisible')) {
            item.classList.remove('invisible');
         } else {
            item.classList.add('invisible');
         }
      });
   }

   function drow() {
      setTimeout(function () {
         clearTranslate();
      }, 500);

      slides.forEach((item) => {
         item.style.opacity = 0;
      });

      sidebarItem.forEach((item) => {
         item.style.opacity = 0;
      });
      slides[step].style.opacity = 1;
      sidebarItem[step2].style.opacity = 1;
   }
   drow();

   function clearTranslate() {
      slides.forEach((item) => {
         item.style.transform = `translateY(${0}px)`;
      });

      sidebarItem.forEach((item) => {
         item.style.transform = `translateY(${0}px)`;
      });
      myEvent = true;
   }

   function changeSlide(direction) {
      myEvent = false;

      if (direction === 'up') {

         slides[step].style.transform = `translateY(-${height}px)`;
         sidebarItem[step2].style.transform = `translateY(${height}px)`;

         if (step + 1 === slides.length) {
            step = 0;
         } else {
            step++;
         }
         if (step2 - 1 < 0) {
            step2 = slides.length - 1;
         } else {
            step2--;
         }

      } else if (direction === 'down') {
         slides[step].style.transform = `translateY(${height}px)`;
         sidebarItem[step2].style.transform = `translateY(-${height}px)`;

         if (step - 1 < 0) {
            step = slides.length - 1;
         } else {
            step--;
         }
         if (step2 + 1 === slides.length) {
            step2 = 0;
         } else {
            step2++;
         }

      } else if (direction === 'prev') {
         slides[step].style.transform = `translateX(${width}px)`;
         sidebarItem[step2].style.transform = `translateX(${width}px)`;

         if (step - 1 < 0) {
            step = slides.length - 1;
         } else {
            step--;
         }
         if (step2 + 1 === slides.length) {
            step2 = 0;
         } else {
            step2++;
         }
      } else if (direction === 'next') {
         slides[step].style.transform = `translateX(-${width}px)`;
         sidebarItem[step2].style.transform = `translateX(-${width}px)`;

         if (step - 1 < 0) {
            step = slides.length - 1;
         } else {
            step--;
         }
         if (step2 + 1 === slides.length) {
            step2 = 0;
         } else {
            step2++;
         }
      }

      slides[step].style.opacity = 0;
      sidebarItem[step2].style.opacity = 0;
      drow();
   }

   directionBtn.addEventListener('click', () => {
      changeDirection();
   });

   controlsBtn.forEach((item) => {
      item.addEventListener('click', () => {
         if (myEvent === true) {
            if (item.classList.contains('up-button')) {
               changeSlide('up');
            } else if (item.classList.contains('down-button')) {
               changeSlide('down');
            } else if (item.classList.contains('prev-button')) {
               changeSlide('prev');
            } else if (item.classList.contains('next-button')) {
               changeSlide('next');
            }
         }
      });
   });

   document.addEventListener('keydown', function (event) {
      if (myEvent === true) {
         if (directionBtn.classList.contains('vertical')) {
            if (event.key === 'ArrowUp') {
               changeSlide('up');
            } else if (event.key === 'ArrowDown') {
               changeSlide('down');
            }
         } else {
            if (event.key === 'ArrowLeft') {
               changeSlide('prev');
            } else if (event.key === 'ArrowRight') {
               changeSlide('next');
            }
         }
      }
   });

   document.addEventListener('wheel', (event) => {
      if (myEvent === true) {
         if (directionBtn.classList.contains('vertical')) {
            if (event.deltaY < 0) {
               changeSlide('up');
            } else if (event.deltaY > 0) {
               changeSlide('down');
            }
         } else {
            if (event.deltaY < 0) {
               changeSlide('next');
            } else if (event.deltaY > 0) {
               changeSlide('prev');
            }
         }
      }
   });

});

