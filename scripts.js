/**Need a function to move images so that they don't overflow */
/**need a function so that when in column navbar form, navbar is shortened/divs display none when menu not clicked */
button = document.getElementById("hamburger");
menu = document.getElementById("menu-options");

function changeNavbar() {
  if (window.innerWidth >= 350) {
    menu.style.display = `flex`;
    button.style.display = `none`;
  } else {
    button.style.display = `flex`;
    menu.style.display = `none`;
  }
}

//resize, navbar
window.addEventListener("resize", changeNavbar);

//click hamburger button (if collapsed)
button.addEventListener("click", () => {
  if (menu.style.display == `flex`) {
    menu.style.display = `none`;
  } else {
    menu.style.display = "flex";
  }
});