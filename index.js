"use strict";

// nav slidemenu funciton
$(function () {
  let targetMainMenu = $(".mainmenu");

  targetMainMenu.click(function () {
    const targetSubMenu = $(this).next(".header__nav__menu__sub");

    for (let i = 0; i < targetMainMenu.length; i++) {
      if ($(this).text() == targetMainMenu[i].innerText) {
        if (targetSubMenu.is(":visible")) {
          targetSubMenu.slideUp();
        } else {
          targetSubMenu.slideDown();
        }
      } else {
        $(targetMainMenu[i])
          .next(".header__nav__menu__sub")
          .css("display", "none");
      }
    }
  });
});

window.onload = function () {
  // change color of header
  const header = document.querySelector(".header");
  const headerHeight = header.getBoundingClientRect().height;
  const headerLetters = header.querySelectorAll(".item__name");
  const navbarbtn = document.querySelector(".nav__toggle-btn");

  document.addEventListener("scroll", function () {
    if (window.pageYOffset > headerHeight) {
      header.classList.add("active");
      headerLetters.forEach((item) => {
        item.classList.add("active");
      });
      navbarbtn.classList.add("active");
    } else {
      header.classList.remove("active");
      headerLetters.forEach((item) => {
        item.classList.remove("active");
      });
      navbarbtn.classList.remove("active");
    }
  });

  // toggle navmenu
  const navToggleBtn = document.querySelector(".nav__toggle-btn");
  // const navicon = document.querySelector(".navicon");
  const navmenu = document.querySelector(".header__nav__menu");

  navToggleBtn.addEventListener("click", function () {
    navmenu.classList.toggle("open");
  });

  // main visual scroll effect
  const sectionMainVisual = document.querySelector(".main");
  const sectionList = document.querySelector(".list");
  let sectionIsmoving = false;
  const winScrollTop = window.pageYOffset;
  function moveSection() {
    const sectionMainTop =
      sectionMainVisual.getBoundingClientRect().top + winScrollTop;
    const sectionMainBottom = sectionMainTop + sectionMainVisual.offsetHeight;

    if (winScrollTop > sectionMainTop && winScrollTop < sectionMainBottom) {
      if (!sectionIsmoving) {
        sectionIsmoving = true;
        moveStartRender();
      }
    }

    if (winScrollTop >= sectionMainBottom) {
      activeCheck();
    }
  }
  function activeCheck() {
    sectionMainVisual.classList.add("active");
    sectionList.classList.add("active");
  }
  function moveStartRender() {
    const winScrollTop = window.pageYOffset;
    const sectionMainTop =
      sectionMainVisual.getBoundingClientRect().top + winScrollTop;
    const sectionMainBottom = sectionMainTop + sectionMainVisual.offsetHeight;

    if (!header.classList.contains("active")) {
      sectionMainVisual.classList.add("active");
      sectionList.classList.add("active");
      scrollMove(sectionMainBottom + 1);
    } else {
      sectionMainVisual.classList.remove("active");
      sectionList.classList.remove("active");
      scrollMove(sectionMainTop);
    }
  }
  function scrollMove(moveY) {
    const speed = 8;
    let vy = 0;
    let scrollY = 0;

    const dir = moveY > window.pageYOffset ? 1 : -1;
    // 아래로 내려갈때는 1, 위로 올라갈때는 -1
    vy += speed * dir;

    if (dir > 0) {
      scrollY = Math.min(moveY, window.pageYOffset + vy);
    } else {
      scrollY = Math.max(moveY, window.pageYOffset + vy);
    }

    const loop = setInterval(function () {
      scrollY = window.pageYOffset + vy;
      window.scrollTo(0, scrollY);

      if (scrollY >= moveY && dir > 0) {
        sectionIsmoving = false;
        clearInterval(loop);
      } else if (scrollY < moveY && dir < 0) {
        sectionIsmoving = false;
        clearInterval(loop);
      }
    }, 10);
  }

  // gallery effect
  const parallaxBody = document.querySelector(".list");
  const parallaxBodyBackground = document.querySelector(".gallery");
  const parallaxList = document.querySelectorAll(".gallery__img");

  function motionParallax() {
    const parallaxOffsetTop =
      parallaxBody.getBoundingClientRect().top + winScrollTop;
    const parallaxThisTop = winScrollTop - parallaxOffsetTop;
    const parallaxSpeed = 900;
    const parallaxPercent = (parallaxThisTop / parallaxSpeed) * 100;
    const parallaxStartValue = 250;
    const parallaxMoveDistance = Math.max(
      parallaxStartValue - parallaxStartValue,
      Math.min(
        parallaxStartValue,
        parallaxStartValue - parallaxStartValue * (parallaxPercent / 100)
      )
    );

    parallaxList[0].style.transform =
      "translate(0px," + parallaxMoveDistance + "px)";
    parallaxList[1].style.transform =
      "translate(0px," + parallaxMoveDistance * 1.8 + "px)";
    parallaxList[2].style.transform =
      "translate(0px," + parallaxMoveDistance * 2.5 + "px)";
    parallaxList[3].style.transform =
      "translate(0px," + parallaxMoveDistance * 3.4 + "px)";
    parallaxList[4].style.transform =
      "translate(0px," + parallaxMoveDistance * 4.3 + "px)";
    parallaxList[5].style.transform =
      "translate(0px," + parallaxMoveDistance * 5.2 + "px)";
    parallaxList[6].style.transform =
      "translate(0px," + parallaxMoveDistance * 6.3 + "px)";
    parallaxList[7].style.transform =
      "translate(0px," + parallaxMoveDistance * 7.1 + "px)";

    if (parallaxPercent > 25) {
      parallaxBodyBackground.classList.add("black");
    } else {
      parallaxBodyBackground.classList.remove("black");
    }
  }

  function init() {
    moveSection();
    motionParallax();
  }
  window.addEventListener("scroll", function () {
    moveSection();
    motionParallax();
  });

  window.addEventListener("resize", function () {
    moveSection();
  });
  init();

  // judge list slide
  const slides = document.querySelector(".slider");
  const slideImg = document.querySelectorAll(".slider li");
  let currentIdx = 0;
  const slideCount = slideImg.length;
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  const SLIDE_WIDTH = 200;
  const SLIDE_MARGIN = 100;

  makeClone();
  initfunction();

  function makeClone() {
    let cloneSlide_first = slideImg[0].cloneNode(true);
    let cloneSlide_last = slides.lastElementChild.cloneNode(true);
    slides.appendChild(cloneSlide_first);
    slides.insertBefore(cloneSlide_last, slides.firstElementChild);
  }

  function initfunction() {
    slides.style.width = (SLIDE_WIDTH + SLIDE_MARGIN) * (slideCount + 2) + "px";
    slides.style.left = -(SLIDE_WIDTH + SLIDE_MARGIN) + "px";
  }

  next.addEventListener("click", function () {
    if (currentIdx <= slideCount - 1) {
      slides.style.left =
        -(currentIdx + 2) * (SLIDE_WIDTH + SLIDE_MARGIN) + "px";
      slides.style.transition = `${0.5}s ease-out`;
    }
    if (currentIdx === slideCount - 1) {
      setTimeout(function () {
        slides.style.left = -(SLIDE_WIDTH + SLIDE_MARGIN) + "px";
        slides.style.transition = `${0}s ease-out`;
      }, 500);
      currentIdx = -1;
    }
    currentIdx += 1;
  });

  prev.addEventListener("click", function () {
    if (currentIdx >= 0) {
      slides.style.left = -currentIdx * (SLIDE_WIDTH + SLIDE_MARGIN) + "px";
      slides.style.transition = `${0.5}s ease-out`;
    }
    if (currentIdx === 0) {
      setTimeout(function () {
        slides.style.left = -slideCount * (SLIDE_WIDTH + SLIDE_MARGIN) + "px";
        slides.style.transition = `${0}s ease-out`;
      }, 500);
      currentIdx = slideCount;
    }
    currentIdx -= 1;
  });

  // simplemenu effect
  const simpleMenuList = document.querySelectorAll(".simplemenu__list");
  simpleMenuList.forEach(function (item) {
    item.addEventListener("mouseover", function () {
      item.classList.add("active");
    });
    item.addEventListener("mouseout", function () {
      item.classList.remove("active");
    });
  });

  // galleryimg efect
  const galleryImg = document.querySelectorAll(".gallery__img");
  galleryImg.forEach(function (item) {
    item.addEventListener("mouseover", function () {
      item.classList.add("active");
    });
    item.addEventListener("mouseout", function () {
      item.classList.remove("active");
    });
  });

  //Show arrow-up when scrolling down
  const listHeight = sectionList.getBoundingClientRect().height;
  const arrowUp = document.querySelector(".arrow-up");
  document.addEventListener("scroll", () => {
    if (window.scrollY > listHeight / 2) {
      arrowUp.classList.add("visible");
    } else {
      arrowUp.classList.remove("visible");
    }
  });

  // Handle click on the 'arrow up' button
  arrowUp.addEventListener("click", function () {
    this.classList.add("active");
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  });
};
