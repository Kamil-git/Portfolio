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
// function carouselSlide() {
//   const buttonNext = document.querySelector("[data-carousel-button='next']")
//   const slideContainer = document.querySelector("#projects__container")
//   let activeSlide = slideContainer.querySelector("[data-active]")
//   const projectSection = document.querySelector("#projects")
//   const paddingContainer = window
//     .getComputedStyle(projectSection, null)
//     .getPropertyValue("padding-left")
//     .split("px")[0] 
//   setTimeout(() => {
//     buttonNext.addEventListener("click", () => {
//       activeSlide = activeSlide.nextElementSibling
//       activeSlide !== null
//         ? slideContainer.scrollTo(activeSlide.getBoundingClientRect().x - paddingContainer, 0)
//         : (activeSlide = slideContainer.children[0])
//       slideContainer.scrollTo(activeSlide.getBoundingClientRect().x - paddingContainer, 0)
//     })
//   }, 1000)
// }
class Slider {
            constructor(elemSelector) {
                this.sliderSelector = elemSelector;
                this.currentSlide = 0; //aktualny slide
                this.time = null; //tutaj będziemy podczepiać setTimeout
                this.slider = null;
                this.elem = null;
                this.slides = null;
                this.prev = null; //przycisk prev
                this.next = null; //przycisk next
                this.dots = [];

                this.generateSlider();
                this.changeSlide(this.currentSlide);
            }

            generateSlider() {
                //pobieramy element który zamienimy na slider-demo
                this.slider = document.querySelector(this.sliderSelector);
                this.slider.classList.add('slider');

                //tworzymy kontener dla slajdow
                const slidesCnt = document.createElement('div');
                slidesCnt.classList.add('slider__slides');

                //pobieramy element slajdów
                this.slides = this.slider.children;

                //to jest zywa kolekcja, więc przy przeniesieniu kazdego slajda
                //jej dlugosc maleje
                while (this.slides.length) {
                    this.slides[0].classList.add('slider__slide');
                    slidesCnt.appendChild(this.slides[0]);
                }
                this.slides = slidesCnt.querySelectorAll('.slider__slide');
                this.slider.appendChild(slidesCnt);

                this.createPrevNext();
                this.createPagination();
            }

            slidePrev() {
                this.currentSlide--;
                if (this.currentSlide < 0) {
                    this.currentSlide = this.slides.length - 1;
                }
                this.changeSlide(this.currentSlide);
            }

            slideNext() {
                this.currentSlide++;
                if (this.currentSlide > this.slides.length - 1) {
                    this.currentSlide = 0;
                }
                this.changeSlide(this.currentSlide);
            }

            changeSlide(index) {
                this.slides.forEach(slide => {
                    slide.classList.remove('slider__slide--active');
                    slide.setAttribute('aria-hidden', true);
                });

                //dodajemy ją tylko wybranemu
                this.slides[index].classList.add('slider__slide--active');
                this.slides[index].setAttribute('aria-hidden', false);

                //podobny manewr robimy dla kropek
                this.dots.forEach(dot => dot.classList.remove('slider__pagination__element--active'));
                this.dots[index].classList.add('slider__pagination__element--active');

                //aktualny slide przestawiamy na wybrany
                this.currentSlide = index;
            };

            createPrevNext() {
                this.prev = document.createElement('button');
                this.prev.type = "button";
                this.prev.innerText = "Poprzedni slide";
                this.prev.classList.add('slider__nav__button');
                this.prev.classList.add('slider__nav__button--prev');
                this.prev.addEventListener('click', this.slidePrev.bind(this));

                this.next = document.createElement('button');
                this.next.type = "button";
                this.next.innerText = "Następny slide";
                this.next.classList.add('slider__nav__button');
                this.next.classList.add('slider__nav__button--next');
                this.next.addEventListener('click', this.slideNext.bind(this));

                const nav = document.createElement('div');
                nav.classList.add('slider__nav');
                nav.appendChild(this.prev);
                nav.appendChild(this.next);
                this.slider.appendChild(nav);
            };

            createPagination() {
                const ulDots = document.createElement('ul');
                ulDots.classList.add('slider__pagination');

                //tworzymy pętlę w ilości liczby slajdów
                for (let i = 0; i < this.slides.length; i++) {
                    //każdorazowo tworzymy LI wraz z buttonem
                    //każdy button po kliknięciu zmieni slajd
                    //za pomocą metody changeSlide()

                    const li = document.createElement('li');
                    li.classList.add('slider__pagination__element');

                    const btn = document.createElement('button');
                    btn.classList.add('slider__pagination__button');
                    btn.type = "button";
                    btn.innerText = i + 1;
                    btn.setAttribute('aria-label', `Ustaw slajd ${i+1}`);

                    btn.addEventListener('click', () => this.changeSlide(i));

                    li.appendChild(btn);

                    ulDots.appendChild(li);
                    this.dots.push(li);
                }

                this.slider.appendChild(ulDots);
            }
        }


const slide = new Slider('#slider1');
// carousel()

scrollYHideNav()
scrollYChangeColor()
