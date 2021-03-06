let carouselElements
let carouselContainer
let arrowLeftElement
let arrowRightElement
let currentElement

export default function({container, elements, arrowLeft, arrowRight}) {
    carouselContainer = container
    carouselElements = Array.from(elements)
    arrowLeftElement = arrowLeft
    arrowRightElement = arrowRight
    currentElement = carouselElements[0]

    carouselContainer.style = `
    display:flex;
    justify-content: flex-start;
    flex-wrap:nowrap;
    overflow:hidden;`

    if (carouselContainer.clientWidth > carouselContainer.scrollWidth) return

    updateButtons()
    arrowLeftElement.addEventListener('click', scrollToLeft)
    arrowRightElement.addEventListener('click', scrollToRight)
    carouselContainer.addEventListener('scroll', updateButtons)
}

function scrollToLeft() {
    carouselContainer.scroll({
        left: carouselContainer.scrollLeft - getWidthPlusPaddingAndMargin(currentElement),
        behavior: 'smooth' 
    })
    backPointer()
}

function scrollToRight() {
    carouselContainer.scroll({
        left: carouselContainer.scrollLeft + getWidthPlusPaddingAndMargin(currentElement),
        behavior: 'smooth' 
    })
    advancePointer()
}

function updateButtons() {
    arrowLeftElement.disabled = false
    arrowRightElement.disabled = false
    if (!carouselContainer.scrollLeft) {
        arrowLeftElement.disabled = true
    } else if (scrolledDistance() === carouselContainer.scrollWidth) {
        arrowRightElement.disabled = true
    }
}

function advancePointer() {
    let index = carouselElements.indexOf(currentElement)
    if(index < carouselElements.length - 1) {
        currentElement = carouselElements[++index]
    }
}

function backPointer() {
    let index = carouselElements.indexOf(currentElement)
    if(index > 0) {
        currentElement = carouselElements[--index]
    }
}

function scrolledDistance() {
    return carouselContainer.clientWidth + carouselContainer.scrollLeft
}

function getWidthPlusPaddingAndMargin(element) {
    return parseFloat(window.getComputedStyle(element).width) +
    parseFloat(window.getComputedStyle(element).paddingLeft) +
    parseFloat(window.getComputedStyle(element).paddingRight) +
    parseFloat(window.getComputedStyle(element).marginLeft) +
    parseFloat(window.getComputedStyle(element).marginRight)
}
