/**Need a function to move images so that they don't overflow */
/**need a function so that when in column navbar form, navbar is shortened/divs display none when menu not clicked */
button = document.getElementById("hamburger");
menu = document.getElementById("menu-options");
var windowWidth;

const orange = "#fe9a20";
const magenta = "#990f4b";

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

function closeDropdown(li) {
    const activeDropdown = document.querySelectorAll(".dropdown-active");
    activeDropdown.forEach((item) => {
        item.remove();
    });
    li.style.backgroundColor = orange;
    li.style.zIndex = "auto";
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
    const openedDropdown = document.querySelector(".open");
    if (openedDropdown !== null){
        closeDropdown(openedDropdown);
        openedDropdown.classList.remove("open");
    }
    menu.style.display = "flex";
  }
});

//if "events" clicked, opens dropdown (for devices with no hover)
canHover = window.matchMedia("(hover : hover)");
if(!canHover.matches){
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((navItem) => {
        if(navItem.children.length > 1){
            navItem.addEventListener("click", (event) => {
                var li = event.target;  //the selected li
                if (li.tagName == "SPAN"){
                    li = li.parentElement;
                }
                //console.log(li);

                //toggle dropdown
                if(li.classList.contains("open")){
                    li.classList.remove("open");
                } else {
                    //close previously opened dropdowns (untested)
                    const navItems = document.querySelectorAll(".nav-item");
                    navItems.forEach((navItem) => {
                        if (navItem.classList.contains("open")){
                            navItem.style.backgroundColor = orange;
                            navItem.style.zIndex = "auto";
                            navItem.classList.remove("open");
                        }
                    });
                    const activeDropdown = document.querySelectorAll(".dropdown-active");
                    activeDropdown.forEach((item) => {
                        item.remove();
                    });
                    li.classList.add("open");
                }

                const children = li.querySelectorAll(".below");
                var currLi = li;
                if(li.classList.contains("open")){  //add all child <a>s as their own <li>
                    var newLi;
                    var duplicateLink;  //link to put in new li
                    children.forEach((child) => {
                        newLi = document.createElement("li");

                        duplicateLink = child.cloneNode("true");
                        duplicateLink.classList.remove("below");

                        newLi.appendChild(duplicateLink);
                        newLi.style.backgroundColor = magenta;
                        newLi.className = "nav-item dropdown-active";
                        
                        currLi.after(newLi);
                        currLi = newLi;
                    });
                    li.style.backgroundColor = magenta;
                    li.style.zIndex = "90";
                } else {
                    closeDropdown(li);
                }
            });
        }
    });
}