import {dropdown, tooltip, select, modal, ModalController, SelectController, ProgressController, DropdownController} from '../ui/js/index'
import utils from '../ui/utils/utils'

tooltip()
dropdown()
select()
modal()


const drop = new DropdownController({
    dropdownTags: {
        name: 'dropdown-default'
    },
    options: {
        asd: {
            dsa: 'asd'
        },
        name: 'asd'
    },
    dropdown:'asd'
})

drop.init()


const ring = new ProgressController({
    name: 'ring',
    type: 'ring',
    percent: 75,
    ringRadius: 30,
    ringColor: 'red',
})


const customSelect = new SelectController({
    name: 'selectBuild',
    options: [
        {value: 0, label: 'Все города'},
        {value: 1, label: 'Москва'},
        {value: 2, label: 'Самара'},
        {value: 3, label: 'Тольятти'},
        {value: 4, label: 'Казань'},
        {value: 5, label: 'Сызрань'},
    ],
    placeholder: 'Выберите город',
    placeholderOption: 'Список пуст',
    onChange: (option) => {
        console.log(option);

    }
});


const progress = new ProgressController({
    name: 'progress',
    percent: 25,
    progressTag: {
        tag1: 'value1',
        tag2: 'value2',
    }
});

const customSelect1 = new SelectController({
    selectTags: {
        name: 'customSelect1'
    },
    divSelect: document.querySelector('[am-select]'),
    onChange: (option) => {
        console.log(option);
    }
});

const modal1 = new ModalController({
    wrapper: document.querySelector('[am-container]'),
    content: [],
    options: {
        adaptive: true,
        mobile: false,
        modalTag: {
            'class': 'modal'
        },
        modalCloseTag: {
            'class': 'modal_close'
        },
        modalContentTag: {
            'class': 'modal_content'
        }
    },
    onDestroy: () => {
        console.log('destroy modal1');

    }
})

const modal11 = new ModalController({
    wrapper: document.querySelector('[am-container]'),
    modal: document.querySelector('[am-modal="modal_bubble"]'),
    onDestroy: () => {
        console.log('destroy modal11');
    }
})

// modal1.render()
// modal11.render()


document.querySelector('[am-container]').appendChild(customSelect.build())
document.querySelector('[am-container]').appendChild(progress.build())


