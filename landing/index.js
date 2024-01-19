const SCROLL_AMOUNT = 550;
const NUM_CARDS = 6;

let activeCardIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    //this will set the zindex of all the cards properly
    updateCardStyles();
    updateScrollBtnStyles();
})

function scrollContent(direction) {
    const scrollableContent = document.getElementById("carousel-cards");
    if (direction === "left") {
        scrollableContent.scrollLeft -= SCROLL_AMOUNT;
        if (activeCardIndex > 0) {
            activeCardIndex--;
        }
    } else if (direction === "right") {
        scrollableContent.scrollLeft += SCROLL_AMOUNT;
        if (activeCardIndex < NUM_CARDS - 1) {
            activeCardIndex++;
        }
    }
    updateCardStyles();
    updateScrollBtnStyles();
}

function updateCardStyles() {
    document.querySelectorAll(".card").forEach((card, i) => {
        //set the zIndex of the cards to have the active card be on top
        card.style.position = "relative";
        card.style.zIndex = `${NUM_CARDS - Math.abs(activeCardIndex - i)}`;

        //scale the cards to make the active one the biggest, and all the rest slightly smaller
        card.style.transform = `scale(${1 - (i !== activeCardIndex ? 0.1 : 0)})`
    });
}

function updateScrollBtnStyles() {
    if (activeCardIndex >= NUM_CARDS - 1) {
        document.getElementById("scroll-cards-right").style.display = "none";
    } else if (activeCardIndex <= 0) {
        document.getElementById("scroll-cards-left").style.display = "none";
    } else {
        document.getElementById("scroll-cards-right").style.display = "";
        document.getElementById("scroll-cards-left").style.display = "";
    }
}