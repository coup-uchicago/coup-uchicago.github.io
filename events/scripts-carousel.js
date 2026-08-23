/*
Format for a carousel (in the events folder)
<div class="carousel">
    <button class="carousel-left uniqueCarouselName"></button>
    <img class="uniqueCarouselName carousel-imgs" style="display : inline" src="">
    <img class="uniqueCarouselName carousel-imgs" style="display : none" src="">
    <button class="carousel-right uniqueCarouselName"></button>
/div>
*/

carouselLefts = Array.from(document.getElementsByClassName("carousel-left"));
carouselRights = Array.from(document.getElementsByClassName("carousel-right"));

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
});

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
});