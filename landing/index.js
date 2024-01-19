const SCROLL_AMOUNT = 550;
const NUM_CARDS = 6;

let activeCardIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    //this will set the zindex of all the cards properly
    setActiveCard("left");
})

function scrollContent(direction) {
    const scrollableContent = document.getElementById("carousel-cards");
    if (direction === "left") {
        scrollableContent.scrollLeft -= SCROLL_AMOUNT;
    } else if (direction === "right") {
        scrollableContent.scrollLeft += SCROLL_AMOUNT;
    }
    setActiveCard(direction);
}

function setActiveCard(direction) {
    if (direction === "left" && activeCardIndex > 0) {
        activeCardIndex--;
    } else if (direction === "right" && activeCardIndex < NUM_CARDS - 1) {
        activeCardIndex++;
    }

    document.querySelectorAll(".card").forEach((card, i) => {
        //set the zIndex of the cards to have the active card be on top
        card.style.position = "relative";
        card.style.zIndex = `${NUM_CARDS - Math.abs(activeCardIndex - i)}`;

        //scale the cards to make the active one the biggest, and all the rest slightly smaller
        card.style.transform = `scale(${1 - (i !== activeCardIndex ? 0.1 : 0)})`
    });
}