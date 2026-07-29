button = document.getElementById("hamburger");
menu = document.getElementById("menu-options");
var windowWidth;
var controller; //AbortController object used to remove event listeners later

const orange = "#fe9a20";
const magenta = "#990f4b";

function changeNavbar() {
  if (window.innerWidth != windowWidth) {   //detect if there has actually been a change
    if (window.innerWidth >= 480){
        menu.style.display = `flex`;
        button.style.display = `none`;
    } else {
        button.style.display = `flex`;
        menu.style.display = `none`;
    }
    if ((window.innerWidth <= 480 && windowWidth > 480) || (window.innerWidth > 480 && windowWidth <= 480)){
        try {
            controller.abort();
        } catch {}
        dropdownNoHover();
        closeDropdown();
        const openDropdown = document.querySelector(".open");
        if (openDropdown){
            openDropdown.classList.remove("open");
        }
    }
  } 
  windowWidth = window.innerWidth;
}

function closeDropdown(li = null) { //does not toggle open
    if (li === null){
        li = document.querySelector(".open");
    }
    const activeDropdown = document.querySelectorAll(".dropdown-active");
    activeDropdown.forEach((item) => {
        item.remove();
    });
    try {   //will not work if li is still null (nothing open)
        li.style.backgroundColor = orange;
        li.style.zIndex = "auto";
    } catch {}
}

//resize navbar
window.addEventListener("resize", changeNavbar);

window.addEventListener("load", () => {
    dropdownNoHover();
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
function dropdownNoHover() {
    canHover = window.matchMedia("(hover : hover)");
    if(window.innerWidth <= 480){   //if hamburger apparent
        const navItems = document.querySelectorAll(".nav-item");
        controller = new AbortController();
        const { signal } = controller;
        navItems.forEach((navItem) => {
            if(navItem.children.length > 1){
                navItem.addEventListener("click", (event) => {
                    var li = event.target;  //the selected li
                    if (li.tagName == "SPAN"){
                        li = li.parentElement;
                    }

                    //toggle dropdown
                    if(li.classList.contains("open")){
                        li.classList.remove("open");
                    } else {
                        //close previously opened dropdowns (untested)
                        /*const navItems = document.querySelectorAll(".nav-item");
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
                        });*/
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
                            duplicateLink.style.display = "block";

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
                }, { signal });
            } 
        });
    } else if (!canHover.matches) { //if hamburger apparent but a touchscreen
        const navItems = document.querySelectorAll(".nav-item");
        controller = new AbortController();
        const { signal } = controller;
        navItems.forEach((navItem) => {
            if(navItem.children.length > 1){
                navItem.addEventListener("click", (event) => {
                    var li = event.target;  //the selected li
                    if (li.tagName == "SPAN"){
                        li = li.parentElement;
                    }

                    if(li.classList.contains("open")){
                        li.classList.remove("open");
                    } else {
                        //close previously opened dropdowns (untested)
                        /*const navItems = document.querySelectorAll(".nav-item");
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
                        });*/
                        li.classList.add("open");
                    }
                }, { signal });
            }
        });
    }
}