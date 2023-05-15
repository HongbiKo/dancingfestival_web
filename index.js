"use strict";

$(function () {
  $(".header__nav__menu__sub").hide();
  $(".mainmenu").click(function () {
    $(this).next($(".header__nav__menu__sub")).slideToggle("fast");
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

  function moveSection() {
    const winScrollTop = window.pageYOffset;
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
    const speed = 6;
    let vy = 0;
    let scrollY = 0;

    const dir = moveY > window.pageYOffset ? 1 : -1;
    vy += speed * dir;

    if (dir > 0) {
      scrollY = Math.min(moveY, window.pageYOffset + vy);
    } else {
      scrollY = Math.max(moveY, window.pageYOffset + vy);
    }

    const loop = setInterval(function () {
      scrollY = window.pageYOffset + vy;

      window.scrollTo(0, scrollY);

      if (scrollY > moveY && dir > 0) {
        sectionIsmoving = false;
        clearInterval(loop);
      } else if (scrollY < moveY && dir < 0) {
        sectionIsmoving = false;
        clearInterval(loop);
      }
    }, 10);
  }

  function init() {
    moveSection();
  }
  window.addEventListener("scroll", function () {
    moveSection();
  });
  init();
};
