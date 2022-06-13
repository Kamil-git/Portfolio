const navbar = document.querySelectorAll(".header__nav > div > a")
const projects = document.querySelector("#projects")

// function checkVisible(elm) {
//   let rect = elm.getBoundingClientRect()
//   let viewHeight = Math.max(
//     document.documentElement.clientHeight,
//     window.innerHeight
//   )
//   return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
// }

// checkVisible(projects)

window.addEventListener('scroll', function(){
  switch (
    !(
      projects.getBoundingClientRect().bottom < 0 ||
      projects.getBoundingClientRect().top -
        Math.max(document.documentElement.clientHeight, window.innerHeight) >=
        0
    )
  ) {
    case true:
      for(i=0; i < navbar.length; i++ ){
        navbar[i].classList.add('active')
        
      }
      console.log('true')
      break
    case false:
      for (i = 0; i < navbar.length; i++) {
        navbar[i].classList.remove("active")
      }
      console.log("false")
      break
    default:
    
  } 
})