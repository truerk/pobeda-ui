const createElement = (tag, attributes, children, text, ns = false) => {
    attributes = attributes || false;
    children = children || false;
    text = text || false;
    let element;

    if (ns) {
        element = document.createElementNS(ns, tag);
    } else {
        element = document.createElement(tag);
    }

    if (children !== false) {
        children.forEach = [].forEach;
        children.forEach(child => {
            if (child !== false) {
                element.appendChild(child);
            }
        });
    }

    if (attributes !== false) {
        for (let key in attributes) {
            if (key !== '') {
                element.setAttribute(key, attributes[key])
            }
        }
    }

    if (text) {
        element.innerHTML = text;
    }
    return element;
};

export default createElement