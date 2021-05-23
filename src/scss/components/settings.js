const bgItems = document.querySelectorAll('.slide-bg__link');
const imageSlides = document.querySelectorAll('.slide-bg__inner');
const shapes = document.querySelectorAll('.shapes__content');
const shapesSlides = document.querySelectorAll('.slide__item');
const helperInput = document.querySelector('#helper-input');

const mouse = document.querySelector('.mouse');
const slideBg = document.querySelector('.slide-bg');
const links = document.querySelector('a');

const slideCount = 5;
let slideCounter = 1;
const easing = BezierEasing(0.770, 0.125, 0.265, 1.040);

const startComplete = () => {
    imageSlides.forEach(el => {el.style.opacity = 1})
    shapesSlides.forEach(el => {el.style.opacity = 1})
};

const startingT1 = gsap.timeline({default: {ease: easing}, onComplete: startComplete});