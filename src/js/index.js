import {dropdown, tooltip, select, modal, ModalController, SelectController, ProgressController} from '../ui/js/index'
import createElement from '../ui/utils/create_element'

select()
dropdown()
tooltip()
modal()

const back = createElement('span', {}, [], 'Назад');
const back1 = createElement('span', {}, [], 'Назад');
const title = createElement('div', {'am-modal-title': ''}, [], 'render_modal-title');
const input = createElement('div', {'am-input': ''}, [
    createElement('input', {'type': 'text', 'value': ''}, [])
]);
const btn = createElement('div', {'am-button': 'main'}, [], 'render_modal-button');

const progress = new ProgressController({
    progress: document.querySelector('[am-progress]'),
    percent: 10,
    progressTag: {
        tag1: 'value1',
        tag2: 'value2',
    }
});


const modal1 = new ModalController({
    wrapper: document.querySelector('[am-container]'),
    children: [
        title,
        input,
        btn
    ],
    modalClose: [back1],
    options: {
        adaptive: true,
        mobile: true,
        modalTag: {
            'class': 'modal'
        },
        modalCloseTag: {
            'class': 'modal_close'
        },
        modalContentTag: {
            'class': 'modal_content'
        }
    }
})

const btnModal = document.querySelector('[am-modal-target="modal_bubble"]')

const modalDefault = new ModalController({
    wrapper: document.querySelector('[am-modal="modal_bubble"]').parentNode.parentNode,
    modal: document.querySelector('[am-modal="modal_bubble"]'),
    options: {
        mobile: true,
    },
    modalClose: [back],
    onRender: () => {console.log('onRender');
    },
    onDestroy: () => {console.log('onDestroy');}
})

btnModal.addEventListener('click', () => {
    modalDefault.render()
})

const customSelect = new SelectController({
    name: 'selectBuild',
    options: [
        {value: 0, label: '1'},
        {value: 1, label: '2'},
        {value: 2, label: '3'},
        {value: 3, label: '4'},
        {value: 4, label: '5'},
        {value: 5, label: '6'},
        {value: 5, label: '7'},
        {value: 5, label: '8'},
    ],
    placeholder: 'Выберите город',
    placeholderOption: 'Список пуст',
    onChange: (option) => {

    }
});

const select1 = customSelect.build();
document.querySelector('[am-container]').append(select1)
document.querySelector('#modal').addEventListener('click', (e) => {
    modal1.render()
})

btn.addEventListener('click', (e) => {
    modal1.destroy(e, true)
})

const inputCity = document.querySelector('[am-input="city"]')

const customSelect1 = new SelectController({
    divSelect: inputCity,
    onChange: (option) => {

    }
});