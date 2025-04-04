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

// Load the YouTube IFrame Player API
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function createPlayer(video, index) {
  var videoURL = new URL(video.src);
  // Extracts video ID from the URL path
  var videoId = videoURL.pathname.split('/').pop(); 
  
  // Append parameters for YouTube player
  videoURL.searchParams.set('enablejsapi', '1');
  videoURL.searchParams.set('autoplay', '1');
  videoURL.searchParams.set('mute', '1');
  videoURL.searchParams.set('rel', '0');
  videoURL.searchParams.set('loop', '1');
  videoURL.searchParams.set('origin', window.location.origin);
  videoURL.searchParams.set('playlist', videoId);
  
  // Set the modified source URL back to the iframe
  video.src = videoURL.href;

  return new YT.Player(video, {
    events: {
      'onReady': function(event) {
        bindControlButton(event.target, index);
      }
    }
  });
}

function bindControlButton(player, index) {
  var button = document.querySelectorAll('.video-controls')[index];
  if (button) {
    button.addEventListener('click', function() {
      var playerState = player.getPlayerState();
      togglePlayback(player, button, playerState);
    });
  }
}

function togglePlayback(player, button, playerState) {
  if (playerState === YT.PlayerState.PLAYING) {
    button.classList.replace('video-playing', 'video-paused');
    button.setAttribute('aria-label', 'play the video');
    button.setAttribute('title', 'play the video');
    player.pauseVideo();
  } else {
    button.classList.replace('video-paused', 'video-playing');
    button.setAttribute('aria-label', 'pause the video');
    button.setAttribute('title', 'pause the video');
    player.playVideo();
  }
}

function removeIframes() {
  var iframes = document.querySelectorAll('.home-hero__video iframe');
  iframes.forEach(function(iframe) {
    iframe.parentNode.removeChild(iframe);
  });
}

function initializeVideos() {
  var videos = document.querySelectorAll('.home-hero__video iframe');
  videos.forEach(createPlayer);
}

function checkScreenSize() {
  if (window.matchMedia('(min-width: 62em)').matches) {
    initializeVideos();
  } else {
    removeIframes();
  }
}

window.onYouTubeIframeAPIReady = checkScreenSize;
window.addEventListener('resize', checkScreenSize);

// Controls/logic for the custom button overlay on YouTube videos
const videoPlayButtons = document.querySelectorAll('.video-block__overlay');

videoPlayButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    console.log("button was clicked")
    button.style.display = "none";
    const youtubeVideoContainer = button.nextElementSibling;
    const youtubeVideo = youtubeVideoContainer.querySelector('iframe');

    createYouTubePlayer(youtubeVideo);
  })
});

function createYouTubePlayer(video) {
  var videoURL = new URL(video.src);
  var videoId = videoURL.pathname.split('/').pop();

  videoURL.searchParams.set('enablejsapi', '1');
  videoURL.searchParams.set('rel', '0');
  videoURL.searchParams.set('origin', window.location.origin);
  videoURL.searchParams.set('playlist', videoId);
  video.src = videoURL.href;

  return new YT.Player(video, {
    events: {
      'onReady': function(event) {
        // Play the video when ready
        event.target.playVideo();
      }
    }
  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
      // Optional parameters
      centeredSlides: true,
      grabCursor: true,
      setWrapperSize: true, 
    
      breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 50
          },
          600: {
            slidesPerView: "auto",
            spaceBetween: 90
          },
      },
  
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
  
      a11y: {
          enabled: true,
          firstSlideMessage: 'This is the first slide',
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          lastSlideMessage: 'This is the last slide'
        },
  
    });
}

initSwiper()