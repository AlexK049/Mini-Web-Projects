function arrToHTMLElement(arr) {
    const replaceClass = '-REPLACE-ME-'

    //create shallow copy to not modify original array
    const htmlStrArr = [...arr];
    
    //the html elements found in the parameter array
    const htmlElements = [];

    for (let i = 0; i < htmlStrArr.length; i++) {
        const item = htmlStrArr[i];
        //if not a string, treat it special
        if (typeof item !== 'string') {
            htmlElements.push(item);
            htmlStrArr[i] = `<div class=${replaceClass}></div>`
        }
    }
    const htmlEle = strToHTMLElement(htmlStrArr.join(''));
    htmlEle.querySelectorAll(`.${replaceClass}`).forEach((element, index) => {
        element.replaceWith(htmlElements[index]);
    });

    return htmlEle;
}

function strToHTMLElement(htmlStr) {
    const container = document.createElement('div');
    container.innerHTML = htmlStr;

    if (container.children.length === 1) {
        return container.firstElementChild;
    } else {
        return container;
    }
}

export { arrToHTMLElement, strToHTMLElement };