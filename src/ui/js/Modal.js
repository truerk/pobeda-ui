import utils from '../utils/utils'

class Modal {
    constructor(props) {
        this.props = props

        this.transitionEnd = utils.event.transitionEnd()
        this.animationEnd = utils.event.animationEnd()

        this.state = {
            wrapper: document.querySelector('body'),
            modalClose: false,
            overlay: false,
            children: false,
            modal: false,
            options: {
                adaptive: true,
                mobile: false,
                modalName: '',
                modalTag: {},
                modalCloseTag: {},
                modalContentTag: {}
            },
            build: false,
            render: false,
            onRender: () => {},
            onDestroy: () => {}
        }

        this.state = utils.object.extend(this.state, this.props)

        if (this.state.modal) {
            this.init()
        } else {
            this.build()
        }
    }

    init() {
        if (this.state.modal) {
            const overlay = this.state.modal.closest('[am-modal-overlay]');
            const modal = this.state.modal;
            const modalClose = this.state.modal.querySelector('[am-modal-close]');

            modal.setAttributes({'build': '', ...this.state.options.modalTag, [this.state.options.mobile ? 'mobile' : '']: '',});
            overlay.setAttributes({[this.state.options.mobile ? 'mobile' : '']: '',});
            modalClose.setAttributes({...this.state.options.modalCloseTag});

            if (this.state.modalClose.length > 0) {
                this.state.modalClose.forEach(item => {
                    modalClose.appendChild(item)
                })
            }

            this.state.modal = modal
            this.state.overlay = overlay
            this.state.modalClose = modalClose
            this.state.build = true

            this.state.overlay.addEventListener('click', this.destroy.bind(this))
            this.state.modalClose.addEventListener('click', this.destroy.bind(this))
        }
    }

    build() {
        const modalClose = utils.element.create('div', {'am-modal-close': '', ...this.state.options.modalCloseTag}, this.state.modalClose.length > 0 ? this.state.modalClose: []);
        const modalContent = utils.element.create('div', {
            'am-modal-content': '', ...this.state.options.modalContentTag}, this.state.children.length > 0 ? this.state.children: []);

        const modal = utils.element.create('div', {
            'am-modal': this.state.options.modalName,
            'build': '',
            [this.state.options.adaptive && !this.state.options.mobile ? 'adaptive' : '']: '',
            [this.state.options.mobile ? 'mobile' : '']: '',
            ...this.state.options.modalTag
        }, [modalClose, modalContent]);

        const overlay = utils.element.create('div', {
            'am-modal-overlay': this.state.options.modalName,
            [this.state.options.mobile ? 'mobile' : '']: '',
        }, [modal]);

        this.state.modal = modal
        this.state.overlay = overlay
        this.state.modalClose = modalClose
        this.state.build = true

        this.state.overlay.addEventListener('click', this.destroy.bind(this))
        this.state.modalClose.addEventListener('click', this.destroy.bind(this))
    }

    render() {
        if (this.state.options.mobile) {
            this.hideChildren([...this.state.wrapper.children])
        }

        this.state.wrapper.insertBefore(this.state.overlay, this.state.wrapper.children[0]);

        this.state.onRender()
        this.state.render = true;

        setTimeout(() => {
            this.state.overlay.setAttribute('active', '');
            this.state.modal.setAttribute('active', '');
        }, 10);
    }

    destroy(e, destroy = false) {
        e.stopPropagation();

        if (!(e.target.hasAttribute('am-modal-close') || e.target.closest('[am-modal-close]') || e.target.hasAttribute('am-modal-overlay')) && !destroy) {
            return
        }

        if (!this.state.render) {
            return;
        }

        this.state.modal.addEventListener(this.transitionEnd, () => {
            this.state.overlay.removeAttribute('closing');
            this.state.modal.removeAttribute('closing');

            this.state.overlay.removeAttribute('active');
            this.state.modal.removeAttribute('active');

            this.state.overlay.remove();
            this.state.onDestroy();
        }, {once: true});

        this.state.overlay.setAttribute('closing', '');
        this.state.modal.setAttribute('closing', '');
        this.state.render = false;

        if (this.state.options.mobile) {
            this.showChildren([...this.state.wrapper.children])
        }
    }

    /**
     * Скрываем все дочерние элементы
     */
    hideChildren(needToHide) {
        needToHide.forEach((el) => {
            if (el) {
                if (el === this.state.overlay) {
                    return
                }
                if (el.constructor.name === 'HTMLCollection') {
                    el.forEach((item) => {
                        item.style.display = 'none';
                    })
                } else {
                    el.style.display = 'none';
                }
            }
        })
    }

    /**
     * Удаляет style у всех дочерних элементов
     */
    showChildren(needToShow) {
        needToShow.forEach((el) => {
            if (el) {
                if (el === this.state.overlay) {
                    return
                }
                if (el.constructor.name === 'HTMLCollection') {
                    el.forEach((item) => {
                        item.removeAttribute('style')
                    })
                } else {
                    el.removeAttribute('style')
                }
            }
        })
    }

    /**
     * Отлавливает модалки по всплытию
     */
    static bubbleInit() {
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('am-modal-target')) {
                this.bubbleRender(e)
            }

            if (e.target.hasAttribute('am-modal-close') || e.target.hasAttribute('am-modal-overlay')) {
                this.bubbleDestroy(e)
            }
        });
    }

    static bubbleRender(e) {
        const buttonTarget = e.target;
        const modalTarget = buttonTarget.getAttribute('am-modal-target');
        const modal = document.querySelector(`[am-modal=${modalTarget}]`);

        if (!modal || modal.hasAttribute('build')) { return }

        const overlay = modal.closest('[am-modal-overlay]');

        overlay.setAttribute('active', '');
        modal.setAttribute('active', '');
    }

    static bubbleDestroy(e) {
        const overlay = e.target.closest('[am-modal-overlay]');
        const modal = overlay.querySelector('[am-modal]');

        if (modal.hasAttribute('build')) { return }

        overlay.setAttribute('closing', '');
        modal.setAttribute('closing', '');

        modal.addEventListener(utils.event.transitionEnd(), function (e) {
            modal.removeAttribute('active');
            modal.removeAttribute('closing');
            overlay.removeAttribute('active');
            overlay.removeAttribute('closing');
        }, {once: true});
    }
}

export default Modal