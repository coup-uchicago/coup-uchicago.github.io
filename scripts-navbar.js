button = document.getElementById("hamburger");
menu = document.getElementById("menu-options");
var windowWidth;

const orange = "#fe9a20";
const magenta = "#990f4b";

function changeNavbar() {
  closeDropdown();
  if (window.innerWidth != windowWidth && window.innerWidth >= 480) {
    menu.style.display = `flex`;
    button.style.display = `none`;
  } else if (window.innerWidth != windowWidth && window.innerWidth < 480) {
    button.style.display = `flex`;
    menu.style.display = `none`;
  }
  windowWidth = window.innerWidth;
}

function closeDropdown(lastOpen = null) {   //only works for mobile dropdown
    if (!lastOpen){
        lastOpen = document.querySelector(".open");
    }
    if(lastOpen){
        //remove li elements (hamburger version)
        const activeDropdownHam = document.querySelectorAll(".dropdown-active");
        activeDropdownHam.forEach((item) => {
            item.remove();
        });

        const activeDropdown = lastOpen.querySelectorAll(".below")
        activeDropdown.forEach((item) => {
            item.style.display = "none";
        });

        lastOpen.style.backgroundColor = orange;
        lastOpen.style.zIndex = "auto";
        lastOpen.classList.remove("open");
    }
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
    closeDropdown();
    menu.style.display = "flex";
  }
});

//if "events" clicked, opens dropdown (for devices with no hover)
canHover = window.matchMedia("(hover : hover)");
if(!canHover.matches && window.innerWidth < 480){
    const navItems = document.querySelectorAll(".nav-item");
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
                    closeDropdown();
                    li.classList.add("open");
                }

                const children = li.querySelectorAll(".below");
                console.log(button.style.display);
                //if (window.innerWidth < 480){   //for hamburger version of dropdown
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
                //} 
                
                /*else {
                    if(li.classList.contains("open")){
                        children.forEach((child) => {
                            child.style.display = "block";
                        });
                        li.style.backgroundColor = magenta;
                        li.style.zIndex = "90";
                    } else {
                        closeDropdown(li);
                    }
                }*/
            });
        }
        
    });
    /*window.addEventListener("click", (event) => {   //close when tapping outside the menu
        if(!event.target.parentElement.classList.contains("below") 
            && !event.target.parentElement.classList.contains("open")
            && event.target.parentElement != button){

            closeDropdown();
            if(window.innerWidth < 480){
                menu.style.display = "none";
            }
        }
    });*/
}