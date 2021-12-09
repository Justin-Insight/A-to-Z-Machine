console.log('%c Crafted by Insight Creative, Inc. Coded by Justin Parsons', 'background: #1d1d1d; color: white; padding: 5px 10px;')

const mobileMenu = document.querySelector(".site-header__mobile-nav");
const hamburger = document.querySelector(".hamburger");
const siteHeader = document.querySelector('.site-header');
const searchButton = document.querySelector('.search-toggle');
const searchModal = document.querySelector('.search-modal');
const searchIcon = document.querySelector('#search')
const closeSearchIcon = document.querySelector('#close')
const videoTrigger = document.querySelector('.video-trigger')
const secondaryVideoTrigger = document.querySelector('.secondary-video-trigger')
const closeVideoBtn = document.querySelector('.video-overlay__button')
const videoOverlay = document.querySelector('.video-overlay')

function initVideoTrigger () {
    if (!document.body.contains(videoTrigger)) return

    videoTrigger.addEventListener('click', event => {
        videoOverlay.classList.add('video-overlay--open')
    })

    secondaryVideoTrigger.addEventListener('click', event => {
        videoOverlay.classList.add('video-overlay--open')
    })
    
    closeVideoBtn.addEventListener('click', event => {
        videoOverlay.classList.remove('video-overlay--open')
    })
} 

initVideoTrigger()

searchButton.addEventListener('click', event => {
    console.log(searchModal)
    if (searchModal.classList.contains('search-open')) {
        // close the search modal
        // change closed icon back to the search icon
        searchModal.classList.remove('search-open')
        searchIcon.classList.remove('icon-hidden')
        closeSearchIcon.classList.add('icon-hidden')
    } else {
        // open the search modal
        // change search icon to close icon
        searchModal.classList.add('search-open')
        searchIcon.classList.add('icon-hidden')
        closeSearchIcon.classList.remove('icon-hidden')
    }
})

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
  siteHeader.classList.remove('expand');
  siteHeader.classList.add('collapse');
}

function expandNav() {
  siteHeader.classList.remove('collapse');
  siteHeader.classList.add('expand');
}

window.addEventListener("scroll", function() {
  scrollDetect(collapseNav, expandNav);
});

hamburger.addEventListener("click", toggleMobileMenu);

function toggleMobileMenu() {
    const mobileMenuWrapper = document.querySelector('.site-header__mobile-nav-inner')
    const mobileMenuWrapperHeight = mobileMenuWrapper.getBoundingClientRect().height

    mobileMenu.style.height = 0

    if(mobileMenu.classList.contains("nav-open")) {
        this.setAttribute("aria-expanded", "false");
        this.setAttribute("aria-label", "open mobile menu");
        mobileMenu.classList.remove("nav-open");
        mobileMenu.style.height = 0
        hamburger.classList.remove("is-active");
    } else {
        mobileMenu.classList.add("nav-open");
        mobileMenu.style.height = mobileMenuWrapperHeight + 'px'
        hamburger.classList.add("is-active");
        this.setAttribute("aria-expanded","true");
        this.setAttribute("aria-label","close mobile menu");
    }
}