function openCloseMenuViewCourse() {
  let hamburgerBtn = document.getElementById("hamburger-checkbox").checked;
  let navbar = document.getElementById("navbarViewCourse");

  navbar.classList.toggle("open");
}

function openCloseMenu() {
  let hamburgerBtn = document.getElementById("hamburger-checkbox").checked;
  let navbar = document.getElementById("navbar");

  navbar.classList.toggle("open");
}

// function checkScreenWidth(){
//   let screenWidth = window.innerWidth;
//   if(screenWidth >= 1024){
//     let navbar = document.getElementById("navbar");
//   }
// }
