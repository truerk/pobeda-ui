import utils from '@utils';
import EventEmitter from '@utils/EventEmitter';

class Collapse extends EventEmitter {
    constructor(selector, props = {}) {
        super()

        this.state = {
            height: 0,
            duration: 300,
            init: true
        }

        this.selectors = {
            collapse: '[am-collapse]',
            wrapper: '[am-collapse-wrapper]',
            button: '[am-collapse-button]'
        };

        if (Array.isArray(selector)) {
            let array;

            if (selector.length) {
                array = selector.map(el => new Collapse(el, props));
            }

            return array;
        }

        this.$element = selector instanceof HTMLElement ? selector : document.querySelector(selector);
        this.$wrapper = this.$element.querySelector(this.selectors.wrapper);
        this.$button = this.$element.querySelector(this.selectors.button);

        this.isActive = false;
        this.state = utils.object.extend(this.state, props);
        this.scrollHeight = this.$wrapper.scrollHeight;

        this.initialized = false;

        if (this.state.init) {
            this.init();
        }
    }

    init() {
        if (this.initialized) return;

        this.$wrapper.setAttribute('style', `max-height: ${this.state.height}px`)

        this.$button.addEventListener('click', e => this.toggle())
        window.addEventListener('resize', e => this.resize())

        this.emit('init', {
            element: this.$element,
            wrapper: this.$wrapper,
            button: this.$button
        })
    }

    toggle() {
        if (this.isActive) {
            this.close()
        } else {
            this.open()
        }

        this.emit('toggle', {
            element: this.$element,
            wrapper: this.$wrapper,
            button: this.$button
        })
    }

    open() {
        this.$button.setAttribute('active', '')
        this.$element.setAttribute('active', '')
        this.$wrapper.setAttribute('active', '')
        this.$wrapper.setAttribute('style', `max-height: ${this.scrollHeight}px`)

        this.isActive = true;
    }

    close() {
        this.$button.removeAttribute('active')
        this.$element.removeAttribute('active')
        this.$wrapper.removeAttribute('active')
        this.$wrapper.setAttribute('style', `max-height: ${this.state.height}px`)

        this.isActive = false;
    }

    resize() {
        this.scrollHeight = this.$wrapper.scrollHeight;

        if (this.isActive) {
            this.$wrapper.setAttribute('style', `max-height: ${this.scrollHeight}px`)
        } else {
            this.$wrapper.setAttribute('style', `max-height: ${this.state.height}px`)
        }
    }

    static bubbleInit() {

    }
}

export default Collapse;