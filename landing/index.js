function scrollContent(direction) {
    const scrollableContent = document.getElementById("carousel-cards");
    const scrollAmount = 200;

    if (direction === "left") {
        scrollableContent.scrollLeft -= scrollAmount;
    } else if (direction === "right") {
        scrollableContent.scrollLeft += scrollAmount;
    }
}