/*
Format for a carousel (in the events folder)
<div class="carousel">
    <button class="carousel-left uniqueCarouselName"></button>
    <img class="uniqueCarouselName carousel-imgs" src="">
    <button class="carousel-right uniqueCarouselName"></button>
/div>
*/

const carouselLefts = Array.from(document.querySelectorAll(".carousel-left"));
const carouselRights = Array.from(document.querySelectorAll(".carousel-right"));

const directories = new Map();

directories.set("Kuvia", "kuvia-assets");
directories.set("Snowball", "snowball-assets");
directories.set("Boos n Ribs", "bnr-assets");
directories.set("Summer Breeze", "sb-assets");
directories.set("Uncommon Nights & Pop-Up Picnic", "uncommon-nights-assets");

async function getImgs() {  //gets image paths and alt text for images
  const requestURL =
    `./${directories.get(document.title)}/imgs.json`;
  const request = new Request(requestURL);

  const response = await fetch(request);
  return await response.json();

}

const imgs = new Map(Object.entries(await getImgs()))

//when the user goes to the next image, change the src of the <img>
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