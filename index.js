"use stirct";

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
  const sectionMainVisual = document.querySelector(".main__visual");
  const sectionList = document.querySelector("list");

  let winScrollTop;
  let sectionIsmoving = false;

  function setProperty() {
    winScrollTop = window.pageYOffset;
    const sectionMainTop =
      sectionMainVisual.getBoundingClientRect().top + winScrollTop;
    const sectionMainBottom = sectionMainTop + sectionMainVisual.offsetHeight;
  }

  function moveSection() {
    setProperty();
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
    header.classList.add("active");
    sectionMainVisual.classList.add("active");
    sectionMainVisual.classList.add("active");
    scrollMove(sectionMainBottom + 1);
  }

  function moveStartRender() {
    if (!header.classList.contains("active")) {
      header.addClass("active");
      sectionMainVisual.addClass("acitve");
      sectionList.addClass("active");
    } else {
      header.classList.classList.remove("active");
      sectionMainVisual.classList.remove("active");
      sectionList.classList.remove("active");
    }
  }

  function scrollMove() {
    const loop = setInterval(function () {}, 10);
  }

  function init() {
    moveSection();
  }
  window.addEventListener("scroll", function () {
    moveSection();
  });
  s;
  init();
};
