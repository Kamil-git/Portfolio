function scrollYHideNav() {
  let lastScrollY = window.scrollY
  let nav = document.querySelector(".nav")
  window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) {
      nav.classList.add("nav--hidden")
    } else {
      nav.classList.remove("nav--hidden")
    }
    lastScrollY = window.scrollY
  })
}

function scrollYChangeColor() {
  const navbar = document.querySelectorAll("header > div > a")
  const projects = document.querySelector("#projects")
  window.addEventListener("scroll", function () {
    switch (
      !(
        projects.getBoundingClientRect().bottom < 0 ||
        projects.getBoundingClientRect().top -
          Math.max(document.documentElement.clientHeight, window.innerHeight) >=
          0
      )
    ) {
      case true:
        for (i = 0; i < navbar.length; i++) {
          navbar[i].classList.add("--active")
        }

        break
      case false:
        for (i = 0; i < navbar.length; i++) {
          navbar[i].classList.remove("--active")
        }

        break
      default:
    }
  })
}

function projectsCarousel() {
  const buttons = document.querySelectorAll("[data-carousel-button]")
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1
      const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]")
      const activeSlide = slides.querySelector("[data-active]")
      let newIndex = [...slides.children].indexOf(activeSlide) + offset
      if (newIndex < 0) newIndex = slides.children.length - 1
      if (newIndex >= slides.children.length) newIndex = 0
      slides.children[newIndex].dataset.active = true
      delete activeSlide.dataset.active
    })
  })
}
function carousel() {
  let buttonPrev = document.querySelector(".projects__button--prev")
  let buttonNext = document.querySelector(".projects__button--next")
  let slideContainer = document.querySelector("#projects__container")
  let slideItem1 =
    document.querySelector("[data-active1]").getBoundingClientRect().x - 80
  let slideItem2 =
    document.querySelector("[data-active2]").getBoundingClientRect().x - 80
  let slideItem3 =
    document.querySelector("[data-active3]").getBoundingClientRect().x - 80
  let slideItem4 =
    document.querySelector("[data-active4]").getBoundingClientRect().x - 80
  
  return buttonNext.addEventListener("click", () => {
    
    switch (true) {
      case slideContainer.scrollLeft <= slideItem1:
        slideContainer.scrollTo(slideItem2, 0)
        break
      case slideContainer.scrollLeft <= slideItem2:
        slideContainer.scrollTo(slideItem3, 0)
        break
      case slideContainer.scrollLeft <= slideItem3:
        slideContainer.scrollTo(slideItem4, 0)
        break
      case slideContainer.scrollLeft <= slideItem4:
        slideContainer.scrollTo(slideItem1, 0)
        break
    }
  })
}
carousel()
projectsCarousel()
scrollYHideNav()
scrollYChangeColor()
