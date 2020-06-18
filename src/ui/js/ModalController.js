import createElement from '../utils/create_element'

function whichTransitionEvent(){
    var t,
        el = document.createElement("fakeelement");

    var transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
    }

    for (t in transitions){
      if (el.style[t] !== undefined){
        return transitions[t];
      }
    }
  }

function whichAnimationEvent(){
    var t,
        el = document.createElement("fakeelement");

    var animations = {
      "animation"      : "animationend",
      "OAnimation"     : "oAnimationEnd",
      "MozAnimation"   : "animationend",
      "WebkitAnimation": "webkitAnimationEnd"
    }

    for (t in animations){
      if (el.style[t] !== undefined){
        return animations[t];
      }
    }
}

export class ModalController{
    constructor(props) {
        this.props = props

        this.transitionEnd = whichTransitionEvent()
        this.animationEnd = whichAnimationEvent()

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

        if (typeof this.props === 'object') {
            this.state = {
                ...this.state,
                wrapper: this.props.wrapper ? this.props.wrapper : this.state.wrapper,
                children: this.props.children ? this.props.children : false,
                modalClose: this.props.modalClose ? this.props.modalClose : false,
            }

            if ('options' in this.props) {
                if ('adaptive' in this.props.options) {
                    this.state.options.adaptive = this.props.options.adaptive;
                }

                if ('mobile' in this.props.options) {
                    this.state.options.mobile = this.props.options.mobile;
                }

                if ('modalName' in this.props.options) {
                    this.state.options.modalName = this.props.options.modalName ? this.props.options.modalName : '';
                }

                if ('modalTag' in this.props.options && typeof this.props.options.modalTag === 'object') {
                    this.state.options.modalTag = this.props.options.modalTag ? this.props.options.modalTag : '';
                }

                if ('modalCloseTag' in this.props.options && typeof this.props.options.modalCloseTag === 'object') {
                    this.state.options.modalCloseTag = this.props.options.modalCloseTag ? this.props.options.modalCloseTag : '';
                }

                if ('modalContentTag' in this.props.options && typeof this.props.options.modalContentTag === 'object') {
                    this.state.options.modalContentTag = this.props.options.modalContentTag ? this.props.options.modalContentTag : '';
                }
            }

            if ('onRender' in this.props && typeof this.props.onRender === 'function') {
               this.state.onRender = this.props.onRender;
            }

            if ('onDestroy' in this.props && typeof this.props.onDestroy === 'function') {
                this.state.onDestroy = this.props.onDestroy;
            }

            if ('modal' in this.props && typeof this.props.modal === 'object') {
                this.state.modal = this.props.modal
                this.init()
            } else {
                this.build()
            }
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
        const modalClose = createElement('div', {'am-modal-close': '', ...this.state.options.modalCloseTag}, this.state.modalClose.length > 0 ? this.state.modalClose: []);
        const modalContent = createElement('div', {
            'am-modal-content': '', ...this.state.options.modalContentTag}, this.state.children.length > 0 ? this.state.children: []);

        const modal = createElement('div', {
            'am-modal': this.state.options.modalName,
            'build': '',
            [this.state.options.adaptive && !this.state.options.mobile ? 'adaptive' : '']: '',
            [this.state.options.mobile ? 'mobile' : '']: '',
            ...this.state.options.modalTag
        }, [modalClose, modalContent]);

        const overlay = createElement('div', {
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
            this.state.overlay.removeAttribute('closing', '');
            this.state.modal.removeAttribute('closing', '');

            this.state.overlay.removeAttribute('active', '');
            this.state.modal.removeAttribute('active', '');

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
    bubbleInit() {
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('am-modal-target')) {
                this.bubbleRender(e)
            }

            if (e.target.hasAttribute('am-modal-close') || e.target.hasAttribute('am-modal-overlay')) {
                this.bubbleDestroy(e)
            }
        });
    }

    bubbleRender(e) {
        const buttonTarget = e.target;
        const modalTarget = buttonTarget.getAttribute('am-modal-target');
        const modal = document.querySelector(`[am-modal=${modalTarget}]`);

        if (!modal || modal.hasAttribute('build')) { return }

        const overlay = modal.closest('[am-modal-overlay]');

        overlay.setAttribute('active', '');
        modal.setAttribute('active', '');
    }

    bubbleDestroy(e) {
        const overlay = e.target.closest('[am-modal-overlay]');
        const modal = overlay.querySelector('[am-modal]');

        if (modal.hasAttribute('build')) { return }

        overlay.setAttribute('closing', '');
        modal.setAttribute('closing', '');

        modal.addEventListener(this.transitionEnd, function (e) {
            modal.removeAttribute('active');
            modal.removeAttribute('closing');
            overlay.removeAttribute('active');
            overlay.removeAttribute('closing');
        }, {once: true});
    }
}

export default function modal() {
    new ModalController().bubbleInit()
}