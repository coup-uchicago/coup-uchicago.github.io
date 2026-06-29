/**Need a function to move images so that they don't overflow */
/**need a function so that when in column navbar form, navbar is shortened/divs display none when menu not clicked */
button = document.getElementById("hamburger");
menu = document.getElementById("menu-options");
var windowWidth;

function changeNavbar() {
  if (window.innerWidth != windowWidth && window.innerWidth >= 480) {
    menu.style.display = `flex`;
    button.style.display = `none`;
  } else if (window.innerWidth != windowWidth && window.innerWidth < 480) {
    button.style.display = `flex`;
    menu.style.display = `none`;
  }
  windowWidth = window.innerWidth;
}

//resize, navbar
window.addEventListener("resize", changeNavbar);

window.addEventListener("load", () => {
    windowWidth = window.innerWidth;
});

//click hamburger button (if collapsed)
button.addEventListener("click", () => {
  if (menu.style.display == `flex`) {
    menu.style.display = `none`;
  } else {
    menu.style.display = "flex";
  }
});