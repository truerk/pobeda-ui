import utils from '@utils'

let init = false;
let bubbleInit = false;

class Select {
    constructor(props) {
        this.props = props

        this.state = {
            divSelect: null,

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

            control: this.control.bind(this),
            controlCounter: -1,

            onRender: () => {},
            onChange: () => {},
            onDestroy: () => {},
        }

        this.state = utils.object.extend(this.state, this.props)

        if (this.state.divSelect) {
            this.initSelect()
        }
    }

    /**
     * Инициализация Select
     */
    init() {
        if (init) { return }
        document.addEventListener('click', (e) => {
            if (!e.target.closest('[am-select]')) {
                e.stopPropagation();
                this.destroy(e);
            }
        });

        init = true
    }

    initSelect() {
        if (this.state.divSelect) {
            this.state.divSelect.setAttribute('build', '')
            const input = this.state.divSelect.querySelector('[am-select-input]');
            const value = this.state.divSelect.querySelector('[am-select-value]');
            const wrapper = this.state.divSelect.querySelector('[am-select-wrapper]');
            const options = this.state.divSelect.querySelector('[am-select-options]');
            const option = this.state.divSelect.querySelectorAll('[am-select-option]');

            if (input) {
                this.state.divInput = input;
            }

            if (value) {
                this.state.divValue = value;
                this.state.divValue.addEventListener('click', (e)=> {
                    this.render()
                })
            }

            if (wrapper) {
                this.state.divWrapper = wrapper;
            }

            if (options) {
                this.state.divOptions = options;
            }

            if (option) {
                let opt = []
                option.forEach(item => {
                    item.setAttribute('tabindex', 0)
                    item.addEventListener('click', (e)=> {
                        e.preventDefault();
                        if ((item.getAttribute('am-select-option') || item.getAttribute('am-select-option') === 0) && !item.hasAttribute('selected')) {
                            this.change(item)
                        }
                    })
                    opt.push({value: item.getAttribute('am-select-option'), label: item.textContent})
                })
                this.state.options = opt
            }
        }

        this.init()
    }

    /**
     * Создает Select
     */
    build() {
        let value, input;

        const optionsArray = this.state.options.length > 0 ? this.state.options.map(item => {
            const option = utils.element.create('div', {'am-select-option': item.value, 'tabindex': '0', ...this.state.optionTags}, [], item.label);
            option.addEventListener('click', (e)=> {
                e.preventDefault();
                if ((item.value || item.value === 0) && !option.hasAttribute('selected')) {
                    this.change(option)
                }
            })
            return option;
        }) : this.state.placeholderOption ? [utils.element.create('div', {'am-select-option': '', ...this.state.optionTags}, [], this.state.placeholderOption)] : '';

        const options = utils.element.create('div', {'am-select-options': '', ...this.state.optionsTags}, optionsArray);
        const wrapper = utils.element.create('div', {'am-select-wrapper': '', ...this.state.optionTags}, [options]);
        if (this.state.placeholder) {
            value = utils.element.create('div', {'am-select-value': ''}, [], this.state.placeholder);
            input = utils.element.create('input', {'am-select-input': '', 'value': '', 'name': this.state.name, 'type': 'hidden'});
        } else {
            if (this.state.options.length > 0) {
                optionsArray[0].setAttribute('selected', '');

                this.state.onChange({value: this.state.options[0].value, label: this.state.options[0].label});
            }
            value = utils.element.create('div', {'am-select-value': this.state.options.length > 0 ? this.state.options[0].value : ''}, [], this.state.options.length > 0 ? this.state.options[0].label : this.state.placeholder);
            input = utils.element.create('input', {'am-select-input': '', 'value': this.state.options.length > 0 ? this.state.options[0].value : '', 'name': this.state.name, 'type': 'hidden'});
        }
        const select = utils.element.create('div', {'am-select': this.state.name, ...this.state.selectTags, 'build': ''}, [input, value, wrapper]);

        this.state.divSelect = select;
        this.state.divInput = input;
        this.state.divValue = value;
        this.state.divWrapper = wrapper;
        this.state.divOptions = options;

        this.state.divValue.addEventListener('click', (e)=> {
            e.preventDefault();
            this.render()
        })

        this.init();
        return select
    }

    /**
     * Открывает Select
     */
    render() {
        const coord = utils.element.coord(this.state.divOptions);

        this.state.divOptions.removeAttribute('reverse')
        if ((coord.clientHeight - coord.bottom) <= 5 && (coord.top - coord.height) > 50 && !this.state.divSelect.hasAttribute('active')) {
            this.state.divOptions.setAttribute('reverse', '')
        }

        if (this.state.divSelect.hasAttribute('active')) {
            this.state.divSelect.removeAttribute('active');
            this.destroy(this.state.divSelect);
        } else {
            this.state.onRender()
            this.destroy(this.state.divSelect, true);
            this.state.divSelect.setAttribute('active', '');
            this.state.render = true
            this.controlInit(true);
        }
    }

    /**
     * Закрывает Select
     * @param {HTMLElement} select1 текущей Select
     * @param {Boolean} nope true, onDestroy не вызовится
     */
    destroy(select1 = false, nope = false) {
        const selects = document.querySelectorAll('[am-select]');

        selects.forEach((select) => {
            if (select !== select1) {
                select.querySelector('[am-select-options]').removeAttribute('reverse')
                select.removeAttribute('active');
            }
        })
        this.state.render = true

        if (!nope) {
            this.state.onDestroy()
        }

        this.controlInit();
    }

    /**
     * Изменяет option
     * @param {Object} option параметры option 
     */
    change(option) {
        this.state.divInput.value = option.getAttribute('am-select-option');
        this.state.divValue.setAttribute('am-select-value', option.getAttribute('am-select-option'))
        this.state.divValue.innerText = option.innerText;
        const selected = this.state.divOptions.querySelector('[am-select-option][selected]');

        if (selected) {
            selected.removeAttribute('selected');
        }
        option.setAttribute('selected', '');

        this.state.value = this.state.options.filter(item => {
            // eslint-disable-next-line eqeqeq
            return item.value == option.getAttribute('am-select-option');
        })

        this.state.onChange({value: this.state.value[0].value, label: this.state.value[0].label})
        this.destroy();
    }

    /**
     * Переключение стрелочками
     * @param {Event} e 
     */
    control(e) {
        e.preventDefault();
        const options = this.state.divOptions.children;

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

    /**
     * Инициализация шаблонных Select
     */
    static bubbleInit() {
        if (bubbleInit) { return }
        document.addEventListener('click', (e) => {
            if ((e.target.hasAttribute('am-select') && e.target.hasAttribute('build')) || (e.target.closest('[am-select]') && e.target.closest('[am-select]').hasAttribute('build'))) {
                return;
            }

            if (e.target.closest('[am-select]') && e.target.closest('[am-select]').hasAttribute('disabled')) {
                return
            }

            if ((e.target.hasAttribute('am-select-value') || e.target.closest('[am-select-value]')) && !e.target.hasAttribute('disabled')) {
                e.stopPropagation();
                this.bubbleRender(e);
            }

            if (!e.target.closest('[am-select]')) {
                e.stopPropagation();
                this.bubbleDestroy(e);
            }

            if ((e.target.hasAttribute('am-select-option') || e.target.closest('[am-select-option]')) && !e.target.hasAttribute('selected')) {
                e.stopPropagation();
                this.bubbleChange(e);
            }
        });
        bubbleInit = true
    }

    static bubbleRender(e) {
        const select = e.target.closest('[am-select]');
        const selectOptions = select.querySelector('[am-select-options]');
        const coord = utils.element.coord(selectOptions);

        selectOptions.removeAttribute('reverse')
        if ((coord.clientHeight - coord.bottom) <= 5 && (coord.top - coord.height) > 50 && !select.hasAttribute('active')) {
            selectOptions.setAttribute('reverse', '')
        }

        if (select.hasAttribute('active')) {
            select.removeAttribute('active');
        } else {
            select.setAttribute('active', '');
        }

        this.bubbleDestroy(e, select);
    }

    static bubbleDestroy(e, select1 = false, important = false) {
        const selects = document.querySelectorAll('[am-select]');

        selects.forEach((select) => {
            if (important || select1 !== select) {
                select.querySelector('[am-select-options]').removeAttribute('reverse')
                select.removeAttribute('active');
            }
        })
    }

    static bubbleChange(e) {
        const select = e.target.closest('[am-select]');
        const selectInput = select.querySelector('[am-select-input]') || select.querySelector('> input');
        const selectValue = select.querySelector('[am-select-value]');
        const selectOption = e.target.hasAttribute('[am-select-option]') ? e.target : e.target.closest('[am-select-option]');
        const selected = select.querySelector('[am-select-option][selected]');

        if (selected) {
            selected.removeAttribute('selected');
        }
        selectOption.setAttribute('selected', '');

        selectInput.value = selectOption.getAttribute('am-select-option');
        selectValue.setAttribute('am-select-value', selectOption.getAttribute('am-select-option'))
        selectValue.innerText = selectOption.innerText;

        this.bubbleDestroy(e, select, true);
    }
}

export default Select