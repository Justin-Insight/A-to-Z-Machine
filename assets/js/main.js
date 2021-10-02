import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pageTransitionOut, pageTransitionIn, updateMenu } from './partials';

barba.use(barbaPrefetch);
gsap.registerPlugin(ScrollTrigger);

const mobileMenu = document.querySelector(".site-header__mobile-nav");
const hamburger = document.querySelector(".hamburger");
const navClasses = document.querySelector('.site-header');
const searchButton = document.querySelector('.search-toggle');
const searchModal = document.querySelector('.search-modal');

console.log(searchButton)
console.log(searchModal)

searchButton.addEventListener('click', event => {
    console.log('search button clicked')
    searchModal.classList.toggle('search-open')
})

// 1. set mobile nav height to 0
const mobileMenuHeight = mobileMenu.getBoundingClientRect().height

console.log(mobileMenuHeight)

mobileMenu.style.height = 0
// 2. on click and nav open set height to the original full height of the mobile navigation

function initSlider() {
    const slider = document.querySelector('.slider')
    const slides = Array.from(slider.querySelectorAll('.slider__slide'))
    const contents = slider.querySelector('.slider__content')
    const dots = Array.from(slider.querySelectorAll('.slider__dot'))
    const slideWidth = slides[0].getBoundingClientRect().width
    if (!document.body.contains(slider)) return

    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px'
    })

    dots.forEach(dot => {
        dot.addEventListener('click', event => {
            let clickedDotIndex

            for (let index = 0; index < dots.length; index++) {
                if (dots[index] === dot) {
                    clickedDotIndex = index
                }
            }

        const slideToShow = slides[clickedDotIndex]
        const destination = getComputedStyle(slideToShow).left
        contents.style.transform = 'translateX(-' + destination + ')'
        slides.forEach(slide => {
            slide.classList.remove('is-selected')
        })
        slideToShow.classList.add('is-selected')
        dots.forEach(dot => {
            dot.classList.remove('is-selected')
        })
        dot.classList.add('is-selected')
        })
    })
}

let scrollState = 0;

var scrollTop = function() {
  return window.scrollY;
};

var scrollDetect = function(collapse, expand) {
  var currentScroll = scrollTop();
  if (currentScroll > scrollState) {
    collapse();
  } else {
    expand();
  }
  scrollState = scrollTop();
};

function collapseNav() {
  navClasses.classList.remove('expand');
  navClasses.classList.add('collapse');
}

function expandNav() {
  navClasses.classList.remove('collapse');
  navClasses.classList.add('expand');
}

window.addEventListener("scroll", function() {
  scrollDetect(collapseNav, expandNav);
});

hamburger.addEventListener("click", toggleMobileMenu);

function toggleMobileMenu() {
    if(mobileMenu.classList.contains("nav-open")) {
        this.setAttribute("aria-expanded", "false");
        this.setAttribute("aria-label", "open mobile menu");
        mobileMenu.classList.remove("nav-open");
        mobileMenu.style.height = 0
        hamburger.classList.remove("is-active");
    } else {
        mobileMenu.classList.add("nav-open");
        mobileMenu.style.height = mobileMenuHeight + 'px'
        hamburger.classList.add("is-active");
        this.setAttribute("aria-expanded","true");
        this.setAttribute("aria-label","close mobile menu");
    }
}

function updateAria() {
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "open mobile menu");
}

const selectAll = (e) => document.querySelectorAll(e);

function fadeInContent() {
    const introSection = document.querySelector(".intro-section");
    const fadeWrapper = document.querySelector(".fade-wrapper .container");
    const fadeUp = document.querySelectorAll(".fade-up");
    const blog = document.querySelector(".blog-container");

    gsap.utils.toArray(fadeUp).forEach((fade) => {
        gsap.from(fade, {
            opacity: 0,
            y: 20,
            duration: .5,
            ease: 'Power2.in',
            scrollTrigger: {
                trigger: fade,
                toggleActions: "play none none reset",
            }
        })
    });
    if (document.body.contains(fadeWrapper)) {
        gsap.from(fadeWrapper, {
            opacity: 0,
            y: 20,
            duration: .5,
            ease: 'Power2.in',
            delay: .5,
            scrollTrigger: {
                trigger: fadeWrapper,
                start: "top bottom-=25",
                toggleActions: "play none none reset",
            }
        });
    }
}

function initZoom() {
    const zoomImages = document.querySelectorAll(".zoom-image");
    gsap.utils.toArray(zoomImages).forEach((section) => {
        const image = section.querySelector('img');
        gsap.to(image, {
            scale: 1.1,
            scrollTrigger: {
                trigger: section,
                scrub: true,
            }
        })
    });
}

function homepageAnimations() {
    fadeInContent();
    initZoom();
}

function initPageTransitions() {
    // do something before the transition starts
    barba.hooks.before(() => {
        updateMenu();
    });

    // do something after the transition finishes
    barba.hooks.after(() => {
        homepageAnimations();
        updateAria();
        ga('set', 'page', window.location.pathname);
        ga('send', 'pageview');
    });

    // scroll to the top of the page
    barba.hooks.enter(() => {
        window.scrollTo(0, 0);
    });

    barba.init({
        timeout: 7000,
        transitions: [{
            name: 'fade-transition',
            once(data) {
                // do something once on the initial page load
                initSlider();
                homepageAnimations();
            },
            async leave(data) {
                // animate loading screen in
                await pageTransitionOut(data.current);
                data.current.container.remove();
            },
            async enter(data) {
                // animate loading screen away
                pageTransitionIn(data.next);
            },
            async beforeEnter(data) {
                ScrollTrigger.getAll().forEach(t => t.kill());
            }

        }]
    });
}

initPageTransitions();