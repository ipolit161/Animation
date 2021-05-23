/**
  * название функции
  *
  * @param {number} first - первое число
  * @returns {number}
  */
 const bgItems = document.querySelectorAll('.slide-bg__link');
 const imageSlides = document.querySelectorAll('.slide-bg__inner');
 const shapes = document.querySelectorAll('.shapes__content');
 const shapesSlides = document.querySelectorAll('.slide__item');
 const helperInput = document.querySelector('#helper-input');
 
 const mouse = document.querySelector('.mouse');
 const slideBg = document.querySelector('.slide-bg');
 const links = document.querySelectorAll('a');
 
 const slideCount = 5;
 let slideCounter = 1;
 const easing = BezierEasing(0.770, 0.125, 0.265, 1.040);
 const mainSection = document.querySelector('.main__section')

 const startComplete = () => {
     imageSlides.forEach(el => {el.style.opacity = 1})
     shapesSlides.forEach(el => {el.style.opacity = 1})
 };


 
 const startingTl = gsap.timeline({default: {ease: easing}, onComplete: startComplete});


 // background
 shapes.forEach(el => { el.style.backgroundColor = `${el.dataset.bg}`});
 bgItems.forEach(el => { el.style.backgroundImage = `url(${el.dataset.bg})`});

 function init() {


window.onload = function () {
  const preloader = document.querySelector('.preloader');
  preloader.classList.add('preloader-animation');

  setTimeout(() =>  {
    preloader.classList.remove('preloader-animation');
    preloader.classList.add('preloader-hidden')
  }, 3000)

  setTimeout(() =>  {
    startAnimation()
    preloader.classList.add('preloader-none')
  }, 3200)
}

  const showNextSlider = () => {
    console.log('next');
    bgSlides('down');
    imagesSlides('down');
    shapeSlides('down');
    textSlides('down');
  }
   const showPrevSlider = () => {
    console.log('prev');
    bgSlides('up');
    imagesSlides('up');
    shapeSlides('up');
    textSlides('up');
   }
   if (window.innerWidth > 768) {
    window.addEventListener('wheel', (e) => {
      
      let delta = -e.deltaY;

      if (delta > 0) {
        if (helperInput.value == '1') {
          helperInput.value = 0;
          showPrevSlider();
          setTimeout(() => {
            console.log('hi1')
            helperInput.value = 1;
          }, 1500);
        }
      } else {
        if (helperInput.value == '1') {
          helperInput.value = 0;
          showNextSlider();
          setTimeout(() => {
            console.log('hi2')
            helperInput.value = 1;
          }, 1500);
        }
      }
    });
   } else {
     document.addEventListener('swiped-left', () => {
      showPrevSlider();
     })
     document.addEventListener('swiped-left', () => {
      showNextSlider()
   })
}
}

 init();

 const bgSlides = (direction) => {
  let itemClass = `slide-${slideCounter}`

  if (direction == 'down') {
    if(slideCounter < slideCount) {
      mainSection.classList.remove(itemClass);
     slideCounter++;
console.log(slideCounter)
     itemClass = `slide-${slideCounter}`;
     mainSection.classList.add(itemClass);
    } 
  }else if (direction == 'up') {
   if(slideCounter > 1) {
    mainSection.classList.remove(itemClass);
     slideCounter--;
     console.log(slideCounter)
     itemClass = `slide-${slideCounter}`;
     mainSection.classList.add(itemClass);
    } 
  }
};

function moveMouse(e) {
  if (e.clientX < 5 || e.clientY < 5 || e.clientY > (window.innerHeight - 5) || e.clientX > (window.innerWidth - 5)) {
    mouse.style.opacity = 0; 
  } else {
    mouse.style.opacity = 1;
    mouse.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
  }
}

if(window.innerWidth >= 768) {
  document.addEventListener('mousemove', moveMouse);
  
  slideBg.addEventListener('mouseover', () => {mouse.classList.add('view-visible') });
  slideBg.addEventListener('mouseleave', () => {mouse.classList.remove('view-visible') });

  links.forEach(link => link.addEventListener('mouseover', () => {mouse.classList.add('links-visible')}));
  links.forEach(link => link.addEventListener('mouseleave', () => {mouse.classList.remove('links-visible')}));
}

const startAnimation = () => {
  const currentSlide = document.querySelector('.slide-bg__inner--current');
  const currentShape = document.querySelector('.shapes__item--current');
  const currentText = document.querySelector('.slides-container__slide--active');

  startingTl.to('.header', 0.5, {
    opacity: 1,
    y: 0,
    delay: 0.5
  })
  .to('.header', 0.5, {
    opacity: 1,
    y: 0,
  }, '-=0.5')
  .to('.main-section__explore', 0.6, {
    opacity: 1,
    y: 0,
  }, '-=0.1')
  .to(currentText.querySelector('.slides-container__title'), 0.6, {
    opacity: 1,
    y: 0,
  }, '-=0.1')
  .to(currentText.querySelector('.disiners-info'), 0.6, {
    opacity: 1,
    y: 0,
  }, '-=0.4')
  .from(currentSlide, 0.4, {
    xPercent: 100
  }, '-=0.4')
  .from(currentSlide.querySelector('.slide-bg__link'), 0.4, {
    xPercent: -100
  }, '-=0.4')
  .from(currentShape, 0.6, {
    xPercent: 100
  }, '-=0.2')
  .from(currentShape.querySelector('.shapes__content'), 0.6, {
    xPercent: -100,
    delay: -0.6
  }, '-=0.2')
};

const imagesSlides = (direction) => {
  let currentSlide = document.querySelector('.slide-bg__inner--current');
  let nextSlide;

  direction == 'down' ? nextSlide = currentSlide.nextElementSibling : nextSlide = currentSlide.previousElementSibling;

  if (nextSlide) {
    imageSlides.forEach(el => {el.classList.remove('index')});

    currentSlide.classList.add('index')

    const tl = gsap.timeline({
      default: {ease: easing},
      onComplete: function () {
        currentSlide.classList.remove('index')
      }
    });

    tl.from(nextSlide, 0.5, {
      xPercent: 100
    })
    .from(nextSlide.querySelector('.slide-bg__link'), 0.5, {
      xPercent: -100,
      delay: -0.5
    });

    currentSlide.classList.remove('slide-bg__inner--current');
    nextSlide.classList.add('slide-bg__inner--current');
  }
};

const shapeSlides = (direction) => {
  let currentSlide = document.querySelector('.shapes__item--current');
  let nextSlide;

  direction == 'down' ? nextSlide = currentSlide.nextElementSibling : nextSlide = currentSlide.previousElementSibling;

  if (nextSlide) {
    shapesSlides.forEach(el => {el.classList.remove('index')});

    currentSlide.classList.add('index')

    const tl = gsap.timeline({
      default: {ease: easing},
      onComplete: function () {
        currentSlide.classList.remove('index')
      }
    });

    tl.from(nextSlide, 0.5, {
      xPercent: 100,
      delay: 0.5
    })
    .from(nextSlide.querySelector('.shapes__content'), 0.5, {
      xPercent: -100,
      delay: -1
    });

    currentSlide.classList.remove('shapes__item--current');
    nextSlide.classList.add('shapes__item--current');
  }
};

const textSlides = (direction) => {
  let currentSlide = document.querySelector('.slides-container__slide--active');
  let nextSlide;

  direction == 'down' ? nextSlide = currentSlide.nextElementSibling : nextSlide = currentSlide.previousElementSibling;

  if (nextSlide && !nextSlide.classList.contains('main-section__explore')) {

    const tl = gsap.timeline({default: {ease: easing} });

    tl.to(currentSlide.querySelector('.slides-container__title'), 0.6, {
      opacity: 0,
      y: 100
    })
    .to(currentSlide.querySelector('.disiners-info'), 0.6, {
      opacity: 0,
      y: 100
    }, '-=0.6')
    .to(nextSlide.querySelector('.slides-container__title'), 0.6, {
      opacity: 1,
      y: 0
    }, '-=0.1')
    .to(nextSlide.querySelector('.disiners-info'), 0.6, {
      opacity: 1,
      y: 0
    }, '-=0.5');

    currentSlide.classList.remove('slides-container__slide--active');
    nextSlide.classList.add('slides-container__slide--active');
  }
};