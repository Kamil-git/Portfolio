$(document).ready(function () {
  document.querySelector("a").addEventListener("click", () => {
    smoothScroll(this.hash)
  })

  function smoothScroll(target) {
    $("body,html").animate(
      {
        scrollTop: target.offset().top,
      },
      800
    )
  }
})
