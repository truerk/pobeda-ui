export const element = {
    coord(element) {
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
    },
    create(tag, attributes, children, text, ns = false) {
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
    }
}