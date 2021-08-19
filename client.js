let circle = document.getElementById("circle");

let surprisesParent = document.querySelector(".surprisesParent");
let boxes = document.querySelectorAll(".boxPic");
let imgs = document.querySelectorAll(".imgs");

let wonGiftsParent = document.querySelector(".wonGiftsParent");

let compTelTex = true;
let domBytTex = false;
document.body.addEventListener("click", function (event) {
    if (event.target.getAttribute("id") == "circle") {

        if (compTelTex) {
            compTelTex = false;
            domBytTex = true;

            circle.style = "left: 110px;transition: 1s ease;background: #FFCC00;"
            compTelGifts.style = "color: white";
            houseGifts.style = "color: black;"
        } else if (domBytTex) {
            compTelTex = true;
            domBytTex = false;

            circle.style = "left: 5px;transition: 1s ease;background: #CD2127;"
            compTelGifts.style = "color: black";
            houseGifts.style = "color: white;"
        }

    } else if (event.target.classList.contains("boxPic")) {
        event.target.remove();
        showGift(event)
    }

})

let compTelArr = ["airPods", "compEar", "compMicro", "webCam", "", "", "", "", ""];
let domBytArr = ["", "", "", "", "", "steamer", "tv", "microwave", "blender"]

function showGift(event) {

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].setAttribute("count", i);
    }

    if (compTelTex) {
        let giftName = compTelArr[event.target.getAttribute("count")];

        if (!giftName) { //esli v korobke pusto
            imgs[event.target.getAttribute("count")].style = `width: 100%;height: 100%; background: center / contain no-repeat url(imgs/sadHappySmiles/sad2.jpg) white;opacity: 1;`
            hideSadSmile(imgs[event.target.getAttribute("count")])
        } else {//esli v koropke podarok
            imgs[event.target.getAttribute("count")].style = `width: 100%;height: 100%; background: center / contain no-repeat url(imgs/compTelGifts/${giftName}.png) white;opacity: 1;`

            //PERENESTI KARTINKU V PRAVYY VERHNIY UGOL I UMENSHIT EE
            replaceAndResizeImg("compTel", giftName, imgs[event.target.getAttribute("count")])
        }
    } else if (domBytTex) {
        let giftName = domBytArr[event.target.getAttribute("count")];

        if (!giftName) { //esli v korobke pusto
            imgs[event.target.getAttribute("count")].style = `width: 100%;height: 100%; background: center / contain no-repeat url(imgs/sadHappySmiles/sad2.jpg) white;opacity: 1;`
            hideSadSmile(imgs[event.target.getAttribute("count")])
        } else {//esli v koropke podarok
            imgs[event.target.getAttribute("count")].style = `width: 100%;height: 100%; background: center / contain no-repeat url(imgs/domBytGifts/${giftName}.jpg) white;opacity: 1;`

            replaceAndResizeImg("domBytTex", giftName, imgs[event.target.getAttribute("count")])
        }

    }

}
function hideSadSmile(event) {

    var fadeTarget = event;
    var fadeEffect = setInterval(function () {

        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
        }

    }, 300);

}


let exWonGift = {
    width: "",
    height: "",
    left: ""
};
let replaceToPx = "";
function replaceAndResizeImg(chosenTechnique, giftName, event) {

    let wonGiftWidth = event.getBoundingClientRect().width;
    let wonGiftHeight = event.getBoundingClientRect().width;
    let wonGiftX = event.getBoundingClientRect().x;
    let wonGiftY = event.getBoundingClientRect().y;

    let wonGift = document.createElement("img");
    if (chosenTechnique == "compTel") {
        wonGift.style = `width: ${wonGiftWidth};height: ${wonGiftHeight};left: ${wonGiftX};top: ${wonGiftY};opacity: 1;background: center / contain no-repeat url(imgs/compTelGifts/${giftName}.png) white;position: absolute;`
    } else {
        wonGift.style = `width: ${wonGiftWidth};height: ${wonGiftHeight};left: ${wonGiftX};top: ${wonGiftY};opacity: 1;background: center / contain no-repeat url(imgs/domBytGifts/${giftName}.jpg) white;position: absolute;`
        console.log(wonGift)
    }
    wonGiftsParent.append(wonGift);

   
    console.log(surprisesParent.getClientRects()[0].width)
    let replace = setInterval(() => {
        if (!exWonGift.width || !exWonGift.left || !exWonGift.height) {
            if (Number(wonGift.style.left.replace("px", "")) < surprisesParent.getClientRects()[0].width) {

                wonGift.style.left = `${Number(wonGift.style.left.replace("px", "")) + 3}px`;
                wonGift.style.width = `${Number(wonGift.style.width.replace("px", "")) - 0.3}px`;
                wonGift.style.height = `${Number(wonGift.style.height.replace("px", "")) - 0.3}px`;

            } else {
                clearInterval(replace);

                exWonGift.left = Number(wonGift.style.left.replace("px", ""));
                exWonGift.width = Number(wonGift.style.width.replace("px", ""));
                exWonGift.height = Number(wonGift.style.height.replace("px", ""));
            }
        } else {
            if (Number(wonGift.style.left.replace("px", "")) < exWonGift.left + exWonGift.width) {

                wonGift.style.left = `${Number(wonGift.style.left.replace("px", "")) + 3}px`;
                wonGift.style.width = `${Number(wonGift.style.width.replace("px", "")) - 0.3}px`;
                wonGift.style.height = `${Number(wonGift.style.height.replace("px", "")) - 0.3}px`;

            } else {
                clearInterval(replace);
                wonGift.style.width = `${exWonGift.width}px`;
                wonGift.style.height = `${exWonGift.height}px`;

                exWonGift.left = Number(wonGift.style.left.replace("px", ""));
                exWonGift.width = Number(wonGift.style.width.replace("px", ""));
                exWonGift.height = Number(wonGift.style.height.replace("px", ""));


            }
        }

    }, 3);

}

