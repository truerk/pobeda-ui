import createElement from '../methods/create_element'

function extendDefaults(source, properties) {
    var property;
    for (property in properties) {
      if (properties.hasOwnProperty(property)) {
        source[property] = properties[property];
      }
    }
    return source;
}

const Utils = {
    isObject(o) {
        return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    extend(...args) {
        const to = Object(args[0]);
        for (let i = 1; i < args.length; i += 1) {
          const nextSource = args[i];
          if (nextSource !== undefined && nextSource !== null) {
            const keysArray = Object.keys(Object(nextSource));
            for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
              const nextKey = keysArray[nextIndex];
              const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
              if (desc !== undefined && desc.enumerable) {
                if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                  Utils.extend(to[nextKey], nextSource[nextKey]);
                } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                  to[nextKey] = {};
                  Utils.extend(to[nextKey], nextSource[nextKey]);
                } else {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }
        }
        return to;
    },
    parseUrlQuery(url) {
        const query = {};
        let urlToParse = url || window.location.href;
        let i;
        let params;
        let param;
        let length;
        if (typeof urlToParse === 'string' && urlToParse.length) {
          urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
          params = urlToParse.split('&').filter((paramsPart) => paramsPart !== '');
          length = params.length;

          for (i = 0; i < length; i += 1) {
            param = params[i].replace(/#\S+/g, '').split('=');
            query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
          }
        }
        return query;
    }
}

// if (arguments[0] && typeof arguments[0] === "object") {
//     this.options = extendDefaults(defaults, arguments[0]);
// }

// if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
//     params = args[0];
//   } else {
//     [el, params] = args;
//   }

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

        /**
         * wrapper: блок, куда будет помещена модалка
         * modalClose: кнопка закрытия
         * overlay: подложка
         * children: блок с контентом модалки
         * modal: блок модалки
         * adaptive: адаптация модалки на маленьких экранов
         * mobile: модалка как static блок
         * modalName: наименование (am-modal="modalName")
         * onRender: функция выполняемая после рендера
         * onDestroy: функция выполняемая после удаление из dom
         */
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
        }

        this.build()
    }

    build() {
        const modalClose = createElement('div', {'am-modal-close': '', ...this.state.options.modalCloseTag}, this.state.modalClose.length > 0 ? this.state.modalClose: []);
        const modalContent = createElement('div', {
            'am-modal-content': '', ...this.state.options.modalContentTag}, this.state.children.length > 0 ? this.state.children: []);

        const modal = createElement('div', {
            'am-modal': this.state.options.modalName,
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
        this.state.overlay.setAttribute('active', '');
        this.state.modal.setAttribute('active', '');

        this.state.onRender()
        this.state.render = true;
    }

    destroy(e, destroy = false) {
        e.stopPropagation();

        if (!(e.target.hasAttribute('am-modal-close') || e.target.closest('[am-modal-close]') || e.target.hasAttribute('am-modal-overlay')) && !destroy) {
            return
        }

        if (!this.state.render) {
            return;
        }

        this.state.modal.addEventListener(this.animationEnd, () => {
            this.state.overlay.removeAttribute('closing', '');
            this.state.modal.removeAttribute('closing', '');

            this.state.overlay.remove();
            this.state.onDestroy();

        }, {once: true});

        this.state.overlay.setAttribute('closing', '');
        this.state.modal.setAttribute('closing', '');
        this.state.render = false;

        if (this.state.options.mobile) {
            this.state.overlay.remove();
            this.showChildren([...this.state.wrapper.children])
        }
    }

    /**
     * Скрываем все дочерние элементы
     */
    hideChildren(needToHide) {
        needToHide.forEach((el) => {
            if (el) {
                if (el.length > 1 || el.constructor.name === 'HTMLCollection') {
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
                if (el.length > 1 || el.constructor.name === 'HTMLCollection') {
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

        if (!modal) { return }

        const overlay = modal.closest('[am-modal-overlay]');

        overlay.setAttribute('active', '');
        modal.setAttribute('active', '');
    }

    bubbleDestroy(e) {
        const overlay = e.target.closest('[am-modal-overlay]');
        const modal = overlay.querySelector('[am-modal]');

        overlay.setAttribute('closing', '');
        modal.setAttribute('closing', '');

        modal.addEventListener(this.animationEnd, function (e) {
            modal.removeAttribute('active');
            modal.removeAttribute('closing');
            overlay.removeAttribute('active');
            overlay.removeAttribute('closing');
        }, {once: true});
    }
}

export default (function modal() {
    new ModalController().bubbleInit()
})();