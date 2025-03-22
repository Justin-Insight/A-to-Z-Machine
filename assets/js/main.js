console.log('%c Crafted by Insight Creative, Inc. Coded by Justin Parsons', 'background: #1d1d1d; color: white; padding: 5px 10px;')

const siteHeader = document.querySelector('.site-header');
const hasSubMenu = document.querySelectorAll(".has-sub-menu");
const mobileMenu = document.querySelector('.site-header__mobile-nav');
const hamburger = document.querySelector('.hamburger');
const searchButton = document.querySelector('.search-toggle');
const searchModal = document.querySelector('.search-modal');
const searchIcon = document.querySelector('#search-icon');
const closeSearchIcon = document.querySelector('#close');
const videoTrigger = document.querySelector('.video-trigger');
const secondaryVideoTrigger = document.querySelector('.secondary-video-trigger');
const closeVideoBtn = document.querySelector('.video-overlay__button');
const videoOverlay = document.querySelector('.video-overlay');

function toggleMobileDropdowns() {
  mobileMenu.addEventListener('click', (event) => {
    const dropdownToggle = event.target.closest('.toggle-mobile-dropdown');

    // If the clicked element is not a dropdown toggle, exit early
    if (!dropdownToggle) {
      return;
    }

    const dropdown = dropdownToggle.parentElement;

    if (dropdown.classList.contains('mobile-dropdown-open')) {
      dropdown.setAttribute('aria-expanded', 'false');
      dropdown.setAttribute('aria-label', 'open mobile dropdown menu');
      mobileMenu.classList.remove('has-dropdown-open');
      dropdown.classList.remove('mobile-dropdown-open');
    } else {
      mobileMenu.classList.add('has-dropdown-open');
      dropdown.classList.add('mobile-dropdown-open');
      dropdown.setAttribute('aria-expanded', 'true');
      dropdown.setAttribute('aria-label', 'close mobile dropdown menu');
    }
  });
}

toggleMobileDropdowns();

hamburger.addEventListener('click', toggleMobileMenu);

// function toggleMobileMenu() {
//   const mobileMenuWrapper = document.querySelector('.site-header__mobile-nav-inner')
//   // const mobileMenuWrapperHeight = mobileMenuWrapper.getBoundingClientRect().height

//   // mobileMenu.style.height = 0

//   if(mobileMenu.classList.contains("nav-open")) {
//       this.setAttribute("aria-expanded", "false");
//       this.setAttribute("aria-label", "open mobile menu");
//       mobileMenu.classList.remove("nav-open");
//       // mobileMenu.style.height = 0
//       hamburger.classList.remove("is-active");
//   } else {
//       mobileMenu.classList.add("nav-open");
//       // mobileMenu.style.height = mobileMenuWrapperHeight + 'px'
//       hamburger.classList.add("is-active");
//       this.setAttribute("aria-expanded","true");
//       this.setAttribute("aria-label","close mobile menu");
//   }
// }

function toggleMobileMenu() {
  if (mobileMenu.classList.contains('nav-open')) {
    this.setAttribute('aria-expanded', 'false');
    this.setAttribute('aria-label', 'open mobile menu');
    mobileMenu.classList.remove('nav-open');
    hamburger.classList.remove('is-active');
  } else {
    mobileMenu.classList.add('nav-open');
    hamburger.classList.add('is-active');
    this.setAttribute('aria-expanded', 'true');
    this.setAttribute('aria-label', 'close mobile menu');
  }
}

function initVideoTrigger () {
    if (!document.body.contains(videoTrigger)) return

    videoTrigger.addEventListener('click', event => {
        videoOverlay.classList.add('video-overlay--open')
    })

    if (document.body.contains(secondaryVideoTrigger)) {
      secondaryVideoTrigger.addEventListener('click', event => {
          videoOverlay.classList.add('video-overlay--open')
      })
    }

    
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

hasSubMenu.forEach((link) => {
  // Helper function to set ARIA-expanded attribute
  function setAriaExpandedAttribute(element, value) {
    element.setAttribute("aria-expanded", value);
  };

  const subMenuToggle = document.querySelector(".sub-menu-toggle");
  const subMenuLinks = link.querySelectorAll(".nav-list__sub-menu-link");

  function openSubMenu() {
    link.classList.add("has-sub-menu-open");
    subMenuToggle.classList.add("sub-menu-is-toggled");
    setAriaExpandedAttribute(subMenuToggle, "true");
  };

  function closeSubMenu() {
    link.classList.remove("has-sub-menu-open");
    subMenuToggle.classList.remove("sub-menu-is-toggled");
    setAriaExpandedAttribute(subMenuToggle, "false");
  };

  link.addEventListener("mouseover", openSubMenu);
  link.addEventListener("mouseout", closeSubMenu);

  // ensure that we open our sub menu when sub menu links are tabbed and focused rather than these remaining visually hidden
  subMenuLinks.forEach((subMenuLink) => {
    subMenuLink.addEventListener("focus", openSubMenu);
    subMenuLink.addEventListener("blur", closeSubMenu);
  });
});