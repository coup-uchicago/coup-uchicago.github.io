const button = document.getElementById("hamburger");
const menu = document.getElementById("menu-options");
var windowWidth;
var controller; //AbortController object used to remove event listeners later

const orange = "#fe9a20";
const magenta = "#990f4b";
const currEventText = "Boos n Ribs 2026";

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
    //adds links to the navbar
    var periods = "..";
    if (document.title == "COUP Home"){
        periods = ".";
    } 
    menu.innerHTML = `
    <li class="nav-item">
        <span>Events</span>
        <a class="below" href="${periods}/events/bnr.html">Boos n Ribs</a>
        <a class="below" href="${periods}/events/kuvia.html">Kuvia</a>
        <a class ="below" href="${periods}/events/snowball.html">Snowball</a>
        <a class="below" href="${periods}/events/sb.html">Summer Breeze</a>
        <a class="below two-lines" href="${periods}/events/uncommon-nights.html">Uncommon Nights & Pop-Up Picnic</a>
    </li>
    <li class="nav-item"><a href="${periods}/events/current-event.html" id="current-event">${currEventText}</a></li>
    <li class="nav-item">
        <span>Stay in touch</span>
        <a class="below" href="https://www.instagram.com/uchicago_coup/" target="_blank">Instagram</a>
        <a class="below" href="https://lists.uchicago.edu/web/info/coup" target="_blank">Listhost</a>
        <a class="below" href="https://www.instagram.com/uchicago_coup/" target="_blank">Contact Us</a>
    </li>
    <li class="nav-item"><a href="https://www.instagram.com/uchicago_coup/" target="_blank">Join Us</a></li>
    `;

    dropdownNoHover();  //sets behavior for devices with no hover
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
                            duplicateLink.style.display = "flexbox";

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
                }, { signal });
            }
        });
    }
}