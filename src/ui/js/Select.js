import element from '@utils/element'
import object from '@utils/object'
import EventEmitter from '@utils/EventEmitter'

let init = false;
// let bubbleInit = false;

class Select extends EventEmitter{
    constructor(element, props) {
        super()

        this.props = props

        this.state = {
            value: {},
            options: [
                // { value: '', label: 'Нет значений'}
            ],

            name: '',
            placeholder: '',
            placeholderOption: '',
            selectTags: {},
            valueTags: {},
            optionsTags: {},
            optionTags: {},

            render: false,
            build: false,

            reverse: false,

            control: this.control.bind(this),
            controlCounter: -1,
        }


        if (Array.isArray(element)) {
            if (element.length) {
                element.forEach(sel => new Select(sel, props));
            }

            return false;
        }

        this.$select = null;
        this.$input = null;
        this.$value = null;
        this.$options = null;
        this.$option = null;

        if (typeof element === 'object') {
            this.$select = element
        } else if (typeof element === 'string') {
            this.$select = document.querySelector(element)
        } else {
            throw new Error('Select: Неправльный тип element')
        }

        this.state = object.extend(this.state, this.props)

        if (this.$select) {
            this.init()
        }
    }

    initDocument() {
        if (init) { return }
        document.addEventListener('click', (e) => {
            if (!e.target.closest('[am-select]')) {
                e.stopPropagation();
                this.destroy(true);
            }
        });

        init = true
    }

    /**
     * Инициализация Select
     */
    init() { 
        this.$input = this.$select.querySelector('[am-select-input]');
        this.$value = this.$select.querySelector('[am-select-value]');
        this.$options = this.$select.querySelector('[am-select-options]');
        this.$select.setAttribute('init', 'true')

        const options = this.$options.querySelectorAll('[am-select-option]')

        // Если есть передали options, добавялем в Select
        if (this.state.options.length) {
            this.state.options.map(option => {
                this.$options.appendChild(element.createTemplate(`
                    <div am-select-option="${option.value}" tab-index="0">${option.label}</div>
                `))
            })
        }

        // Если есть option в шаблоне, добавляем их в стейт
        if (options.length) {
            options.forEach(item => {
                this.state.options.push({value: item.getAttribute('am-select-option'), label: item.textContent})
                item.setAttribute('tabindex', 0)
            })
        }

        this.$option = this.$options.querySelectorAll('[am-select-option]')

        this.$option.forEach(option => {            
            option.addEventListener('click', (e)=> {
                e.preventDefault();

                if (!option.hasAttribute('selected')) {
                    this.change(option)
                }
            })
        })

        this.$value.addEventListener('click', (e)=> {
            this.render()
        })

        this.initDocument()
    }

    /**
     * Открывает Select
     */
    render() {
        // const coord = utils.element.coord(this.state.divOptions);
        // this.state.divOptions.removeAttribute('reverse')
        // if ((coord.clientHeight - coord.bottom) <= 5 && (coord.top - coord.height) > 50 && !this.state.divSelect.hasAttribute('active')) {
        //     this.state.divOptions.setAttribute('reverse', '')
        // }

        if (this.$select.hasAttribute('active')) {
            this.$select.removeAttribute('active');
            this.destroy();
        } else {
            this.emit('render', this.$select)
            this.destroy(true);
            this.state.render = true
            this.controlInit(true);
            this.$select.setAttribute('active', '');
        }
    }

    /**
     * Закрывает Select
     * @param {HTMLElement} currentSelect текущей Select
     * @param {Boolean} notEmit true, destroy не вызовится
     */
    destroy(notEmit = false) {
        const selects = document.querySelectorAll('[am-select]');

        selects.forEach((select) => {
            select.removeAttribute('active');
        })
        
        if (!notEmit) {
            this.emit('destroy', this.$select) 
        }
        this.controlInit();
    }

    /**
     * Изменяет option
     * @param {Object} option параметры option 
     */
    change(option) {
        this.$input.value = option.getAttribute('am-select-option');
        this.$value.setAttribute('am-select-value', option.getAttribute('am-select-option'))
        this.$value.innerText = option.innerText;
        const selected = this.$options.querySelector('[am-select-option][selected]');

        if (selected) {
            selected.removeAttribute('selected');
        }
        option.setAttribute('selected', '');

        this.state.value = this.state.options.filter(item => {
            // eslint-disable-next-line eqeqeq
            return item.value == option.getAttribute('am-select-option');
        })

        this.state.value = {value: this.state.value[0].value, label: this.state.value[0].label}

        this.emit('change', this.state.value)
        this.destroy();
    }

    /**
     * Переключение стрелочками
     * @param {Event} e 
     */
    control(e) {
        e.preventDefault();
        const options = this.$options.children;

        if(event.which == 38) {
            if (!options[this.state.controlCounter - 1]) {return}
            this.state.controlCounter -= 1;
            options[this.state.controlCounter].focus()
        } else if (event.which == 40) {
            if (!options[this.state.controlCounter + 1]) {
                return
            }
            this.state.controlCounter += 1
            options[this.state.controlCounter].focus()
        } else if(event.which == 13){
            console.log(options[this.state.controlCounter]);
            options[this.state.controlCounter].click()
        }
    }

    /**
     * Инициализация контроля
     * @param {*} render true, добавляет обработчик, иначе удаляет
     */
    controlInit(render = false) {
        if (render) {
            document.addEventListener('keydown', this.state.control, false);
        } else {
            document.removeEventListener('keydown', this.state.control, false);
        }
    }
}

export default Select