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

//resize navbar
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

//if "events" clicked, opens dropdown (for devices with no hover)
canHover = window.matchMedia("(hover : hover)");
if(!canHover.matches){
    const navItems = document.querySelectorAll(".nav-desktop");
    navItems.forEach((navItem) => {
        if (navItem.children.length > 1){   //target only dropdowns
            navItem.addEventListener("click", (event) => {
                var li = event.target;  //the selected li
                if (li.tagName == "SPAN"){
                    li = li.parentElement;
                }

                const children = li.querySelectorAll(".below");

                //close dropdown
                if (children[0].style.display == "block"){
                    children.forEach((child) => {
                        child.style.display = "none";  
                    });
                    li.style.backgroundColor = "#fe9a20";
                    li.style.zIndex = "auto";
                } else {    //open dropdown
                    children.forEach((child) => {
                        child.style.display = "block";  
                    });
                    li.style.backgroundColor = "#990f4b";
                    li.style.zIndex = "90";   
                }
            });
        }
    });
}