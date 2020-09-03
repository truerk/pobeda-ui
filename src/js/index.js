import {dropdown, tooltip, select, modal, ModalController, SelectController, ProgressController, DropdownController, Tabs} from '../ui/js/index'
import utils from '../ui/utils/utils'
import EventEmitter from '../ui/utils/EventEmitter'
import Swiper from 'swiper'

// import './forms'
// import './tabs'

tooltip()
dropdown()
select()
modal()

/**
 * Класс для аккордеона
 */
export class Accordion extends EventEmitter {
    /**
     * 
     * @param {*} element родительский HTMLELement или css селектор вкладок
     * @param {*} props параметры аккордеона
     */
    constructor(element, props) {
        super()

        this.state = {
            class: '[am-accordion]',
            tabClass: '[am-accordion-tab]',
            contentClass: '[am-accordion-content]',
            panelClass: '[am-accordion-panel]',

            multiple: false,
            active: true,
            init: false,

            duration: 300,
        }

        this.state = utils.object.extend(this.state, props)
        this.isShow = false

        // if (Array.isArray(selector)) {
        //     if (selector.length) {
        //         selector.map(single => new Accordion(single, userOptions));
        //     }
  
        //     return false;
        // }

        this.$accordion = document.querySelector(this.state.class)

        if (typeof element === 'object') {
            this.$accordion = element
        } else if (typeof element === 'string') {
            this.$accordion = document.querySelector(element)
        }

        this.$tabs = this.$accordion.querySelector(this.state.tabClass)
        this.$contents = this.$accordion.querySelector(this.state.contentClass)
        this.$panels = this.$accordion.querySelector(this.state.panelClass)

        if (this.state.init) {
            this.init()
        }
    }


    /**
     * Инициализация аккордеона
     */
    init() {
        try {
            // Навешиваем обработчик нажатий на вкладку
            // this.$tabs.forEach(element => element.addEventListener('click', () => this._change(element)))
            this.$tabs.addEventListener('click', () => this.toggle())
            this.$contents.style.setProperty('transition', `height ease-in-out ${this.state.duration}ms`)
            
            this.emit('init', {
                state: this.state
            })
        } catch (error) {
            console.log(`Error in Accordion (init): ${error}`)
        }
    }

    /**
     * Переключатель состояний
     * @param {HTMLELement} tab
     */
    toggle() {   
        try {            
            if (this.isShow) {
                this.hide()
            } else {
                this.show()
            }

            this.isShow = !this.isShow

            this.emit('change', this.$tabs, this.$contents)
        } catch (error) {
            console.log(`Error in Tab (toggle): ${error}`)
        }
    }

    /**
     * Открывает аккордеон
     */
    show() {
        const height = this.$contents.scrollHeight

        this.$tabs.setAttribute('active', '')
        this.$panels.setAttribute('active', '')
        this.$contents.setAttribute('showing', '')

        this._setHeight(`${height}px`)

        setTimeout(() => {
            this._showEnd()
        }, this.state.duration);
    }

    _showEnd() {
        this.$contents.removeAttribute('showing')
        this.$contents.setAttribute('show', '')
        // this.$contents.style.setProperty('height', 'auto')

    }    

    /**
     * Закрывает аккордеон
     */
    hide() {
        this.$contents.setAttribute('hiding', '')

        this._setHeight(0)

        setTimeout(() => {
            this._hideEnd()
        }, this.state.duration);
    }

    _hideEnd() {
        this.$contents.removeAttribute('show')
        this.$contents.removeAttribute('hiding')
        this.$tabs.removeAttribute('active')
        this.$panels.removeAttribute('active')
    }

    /**
     * Задает высоту с анимацией
     * @param {string} height высоту элемента - 0 || px
     */
    _setHeight(height) {
        this.$contents.style.setProperty('height', `${this.$contents.scrollHeight}px`)

        window.requestAnimationFrame(() => {
            this.$contents.style.setProperty('height', `${height}`)
        });
    }
}

const accordion = new Accordion('[am-accordion="simple"]', {
    duration: 300,
    active: false,
    init: false,
})

accordion.init()

accordion.on('init', (data) => {
    console.log(data);
})

accordion.on('change', (tab, panel) => {
    console.log(tab, panel);
})


