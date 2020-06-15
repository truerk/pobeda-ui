export default function getCoord(element) {
    return {
        height: parseInt(element.getBoundingClientRect().bottom - element.getBoundingClientRect().top),
        width: parseInt(element.getBoundingClientRect().right - element.getBoundingClientRect().left),
        scrollHeight: element.scrollHeight,
        top: element.getBoundingClientRect().top,
        bottom: element.getBoundingClientRect().bottom,
        left: element.getBoundingClientRect().left,
        right: element.getBoundingClientRect().right,
        clientHeight: document.documentElement.clientHeight,
        clientWidth: document.documentElement.clientWidth,
    }
}