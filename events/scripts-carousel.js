/*
Format for a carousel (in the events folder)
<div class="carousel">
    <button class="carousel-left uniqueCarouselName"></button>
    <img class="uniqueCarouselName carousel-imgs" src="">
    <button class="carousel-right uniqueCarouselName"></button>
/div>
*/
//import { imgs } from "./kuvia-assets/imgsMap.js";
const carouselLefts = Array.from(document.querySelectorAll(".carousel-left"));
const carouselRights = Array.from(document.querySelectorAll(".carousel-right"));

const directories = new Map();

directories.set("Kuvia", "kuvia-assets");
directories.set("Snowball", "snowball-assets");
directories.set("Boos n Ribs", "bnr-assets");
directories.set("Summer Breeze", "sb-assets");
directories.set("Uncommon Nights & Pop-Up Picnic", "uncommon-nights-assets");

async function getImgs() {
  const requestURL =
    `./${directories.get(document.title)}/imgs.json`;
  const request = new Request(requestURL);

  const response = await fetch(request);
  return await response.json();
  //return imgs;
}

//const obj = await populate();
//console.log(obj)

const imgs = new Map(Object.entries(await getImgs()))

//console.log(document.title);
/*
const imgs = new Map();

const altText = new Map();

//images for each page
imgs.set(
    "Kuvia.carousel1",
    ["./kuvia-assets/kuvia-2026.png",
        "./kuvia-assets/kuvia-2024.jpg",
        "./kuvia-assets/kuvia-2023.jpg",
        "./kuvia-assets/kuvia-2022.jpg",
        "./kuvia-assets/kuvia-2013.png"
    ]
);

imgs.set(
    "Kuvia.carousel2",
    [
        "./kuvia-assets/posing-crown.jpg",
        "./kuvia-assets/downward-dog.png",
        "./kuvia-assets/palms-together.png",
        "./kuvia-assets/karate.png",
        "./kuvia-assets/rowing.png",
        "./kuvia-assets/flags.png",
        "./kuvia-assets/line-to-crown.png",
        "./kuvia-assets/walking-to-point.jpg",
        "./kuvia-assets/sun-salutation-outdoors.jpg"
    ]
)

altText.set("./kuvia-assets/kuvia-2026.png", "poster of a polar bear with flowers, ornaments, and a sun");
altText.set
*/
/*
carouselLefts.forEach(carouselLeft => {
    carouselLeft.addEventListener("click", () => {
        const carouselImgs = Array.from(document.querySelectorAll("."+String(carouselLeft.classList[1]) + ".carousel-imgs"));
        var next = 0;
        for(i = 0; i < carouselImgs.length; i++){
            if(carouselImgs[i].style.display == "inline"){
                next = i;
                break;
            }
        }
        next--;
        if(next < 0){
            next = carouselImgs.length - 1;
        }
        carouselImgs.forEach(carouselImg => {
            carouselImg.style.display = "none";
        });
        carouselImgs[next].style.display = "inline";
    });
});*/

carouselLefts.forEach(carouselLeft => {
    carouselLeft.addEventListener("click", () => {
        const carouselName = carouselLeft.classList[1];
        const carouselImgs = imgs.get(`${document.title}.${carouselName}`);
        console.log(imgs)
        const currImg = document.querySelector(".carousel-imgs."+String(carouselName));
        var next = carouselImgs.indexOf(currImg.getAttribute("src")) - 1;
        if(next < 0) {
            next = carouselImgs.length - 1;
        }
        currImg.src = carouselImgs[next];
        currImg.alt = imgs.get(carouselImgs[next]);
    });
});

/*
carouselRights.forEach(carouselRight => {
    carouselRight.addEventListener("click", () => {
        const carouselImgs = Array.from(document.querySelectorAll("."+String(carouselRight.classList[1]) + ".carousel-imgs"));
        var next = 0;
        for(i = 0; i < carouselImgs.length; i++){
            if(carouselImgs[i].style.display == "inline"){
                next = i;
                break;
            }
        }
        next++;
        if(next > carouselImgs.length - 1){
            next = 0;
        }
        carouselImgs.forEach(carouselImg => {
            carouselImg.style.display = "none";
        });
        carouselImgs[next].style.display = "inline";
    });
});*/

carouselRights.forEach(carouselRight => {
    carouselRight.addEventListener("click", () => {
        const carouselName = carouselRight.classList[1];
        const carouselImgs = imgs.get(`${document.title}.${carouselName}`);
        const currImg = document.querySelector(".carousel-imgs."+String(carouselName));
        var next = carouselImgs.indexOf(currImg.getAttribute("src")) + 1;
        if(next > carouselImgs.length - 1) {
            next = 0;
        }
        currImg.src = carouselImgs[next];
        currImg.alt = imgs.get(carouselImgs[next]);
    });
});