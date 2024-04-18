"use strict";

/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

/**
 * HEADER & BACK TOP BTN
 * header and back top btn visible when window scroll down to 200px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElementOnScroll = function () {
  if (window.scrollY > 200) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

window.addEventListener("scroll", activeElementOnScroll);

/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");

const sliderInit = function (currentSlider) {
  const sliderContainer = currentSlider.querySelector(
    "[data-slider-container]"
  );
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  const totalSliderVisibleItems = Number(
    getComputedStyle(currentSlider).getPropertyValue("--slider-item")
  );
  const totalSliderItems =
    sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  };

  /**
   * NEXT SLIDE
   */
  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSliderItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  };

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREVIOUS SLIDE
   */
  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = totalSliderItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  };

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSliderItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.setAttribute("disabled", "");
    sliderPrevBtn.setAttribute("disabled", "");
  }

  /**
   * AUTO SLIDE
   */

  let autoSlideInterval;

  const startAutoSlide = () =>
    (autoSlideInterval = setInterval(slideNext, 3000));
  startAutoSlide();
  const stopAutoSlide = () => clearInterval(autoSlideInterval);

  currentSlider.addEventListener("mouseover", stopAutoSlide);

  currentSlider.addEventListener("mouseout", startAutoSlide);

  /**
   * RESPONSIVE
   */

  window.addEventListener("resize", moveSliderItem);
};

for (let i = 0, len = sliders.length; i < len; i++) {
  sliderInit(sliders[i]);
}

/**  ADD TO CART QUERY */

document.addEventListener("DOMContentLoaded", function () {
  const navbarLoginLogoutButton = document.getElementById(
    "navbar-login-logout"
  );
  const footerLogin = document.getElementById("footer-login");

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser) {
    // Changing to Logout if a user is found
    navbarLoginLogoutButton.setAttribute("href", "#");
    navbarLoginLogoutButton.innerText = "Logout";
    footerLogin.innerText = "Logout";
    navbarLoginLogoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
    footerLogin.addEventListener("click", function (e) {
      e.preventDefault();
      logout();
    });
  } else {
    // Keeping as Login if no user is found
    navbarLoginLogoutButton.setAttribute("href", "./login.html");
    navbarLoginLogoutButton.innerText = "Login";
    footerLogin.innerText = "Login";
  }

  // Select all buttons with the class "btn-primary"
  var addToCartButtons = document.querySelectorAll(".btn-primary");

  // Add click event listener to each button
  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Handle the click event for each button here
      console.log("Add to cart button clicked");
      // You can perform additional actions here, such as adding the item to the shopping cart
    });
  });
});

/**
 * ACCORDION
 */

const accordions = document.querySelectorAll("[data-accordion]");

let lastActiveAccordion;

const accordionInit = function (currentAccordion) {
  const accordionBtn = currentAccordion.querySelector("[data-accordion-btn]");

  accordionBtn.addEventListener("click", function () {
    if (currentAccordion.classList.contains("active")) {
      currentAccordion.classList.toggle("active");
    } else {
      if (lastActiveAccordion) lastActiveAccordion.classList.remove("active");
      currentAccordion.classList.add("active");
    }

    lastActiveAccordion = currentAccordion;
  });
};

for (let i = 0, len = accordions.length; i < len; i++) {
  accordionInit(accordions[i]);
}

function logout() {
  console.log("Logging out...");
  localStorage.removeItem("currentUser"); // Remove user from storage
  window.location.href = "./index.html"; // Redirect to the homepage
}
