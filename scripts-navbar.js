const button = document.getElementById("hamburger");
const menu = document.getElementById("menu-options");
var oldWidth;   //old window.innerWidth (before resize)
var controller; //AbortController object used to remove event listeners later (should hover status change -- untested)

const orange = "#fe9a20";
const magenta = "#990f4b";
const currEventText = "Boos n Ribs 2026";
const breakpoint = vhToPx(7) + remToPx(48);

function vhToPx(vh){
    return vh * (window.innerHeight / 100);
}

function remToPx(rem){
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

function changeNavbar() {
  if (window.innerWidth != oldWidth) {   //detect if there has actually been a change
    if (window.innerWidth >= breakpoint){
        menu.style.display = `flex`;
        button.style.display = `none`;
    } else {
        button.style.display = `flex`;
        menu.style.display = `none`;
    }
    if ((window.innerWidth <= breakpoint && oldWidth > breakpoint) || (window.innerWidth > breakpoint && oldWidth <= breakpoint)){  //change from hamburger to no hamburger
        try {
            controller.abort();
        } catch {}
        setUpDropdownNoHover();
        closeDropdown();
    }
  } 
  oldWidth = window.innerWidth;
}
//resize navbar
window.addEventListener("resize", changeNavbar);

function closeDropdown(li = null) {
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
        li.classList.remove("open");
    } catch {}
}

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
    <li class="nav-item"><a href="${periods}/events/current-event.html">${currEventText}</a></li>
    <li class="nav-item">
        <span>Stay in touch</span>
        <a class="below" href="https://www.instagram.com/uchicago_coup/" target="_blank">Instagram</a>
        <a class="below" href="https://lists.uchicago.edu/web/info/coup" target="_blank">Listhost</a>
        <a class="below" href="https://www.instagram.com/uchicago_coup/" target="_blank">Contact Us</a>
    </li>
    <li class="nav-item"><a href="https://www.instagram.com/uchicago_coup/" target="_blank">Join Us</a></li>
    `;

    oldWidth = window.innerWidth;
    setUpDropdownNoHover();  //sets behavior for devices with no hover and/or with hamburger apparent
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
function setUpDropdownNoHover() {
    canHover = window.matchMedia("(hover : hover)");
    controller = new AbortController();
    const { signal } = controller;
    if(window.innerWidth <= breakpoint){   //if hamburger apparent -- will need changing if breakpoint changes
        const navItems = document.querySelectorAll(".nav-item");
        navItems.forEach((navItem) => {
            if(navItem.children.length > 1){    //if a dropdown
                navItem.addEventListener("click", (event) => {
                    var li = event.target;  //the selected li
                    if (li.tagName == "SPAN"){
                        li = li.parentElement;
                    }

                    //toggle dropdown
                    if(li.classList.contains("open")){
                        li.classList.remove("open");
                        li.style.backgroundColor = orange;
                    } else {
                        closeDropdown();
                        li.classList.add("open");
                        li.style.backgroundColor = magenta;
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
        navItems.forEach((navItem) => {
            if(navItem.children.length > 1){
                navItem.addEventListener("click", (event) => {
                    var li = event.target;  //the selected li
                    if (li.tagName == "SPAN"){
                        li = li.parentElement;
                    }

                    if(li.classList.contains("open")){
                        li.classList.remove("open");
                        li.style.backgroundColor = orange;
                    } else {
                        closeDropdown();
                        li.classList.add("open");
                        li.style.backgroundColor = magenta;
                    }
                }, { signal });
            }
        });
    }
    if (window.innerWidth < breakpoint || !canHover.matches){  //if either of the above two conditions were true
        document.addEventListener("click", (event) => {
            if (!(event.target.classList.contains("nav-item") 
                || event.target.parentElement.classList.contains("nav-item")
                || event.target.classList.contains("hamburger-item"))) {  //if smth clicked that's not part of dropdown, then close dropdown
                closeDropdown();
                if (window.innerWidth < breakpoint){
                    menu.style.display = "none";
                }
            }
        }, { signal });
    }
}