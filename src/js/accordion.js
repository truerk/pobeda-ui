import {dropdown, tooltip, select, modal, ModalController, SelectController, ProgressController, DropdownController, Tabs, Accordion} from '../ui/js/index'

// const accordion = new Accordion('[am-accordion="simple"]', {
//     duration: 300,
//     active: false,
//     init: false,
// })

const accordion = new Accordion('[am-accordion="simple"]')

const accordionMultiple = new Accordion('[am-accordion="multiple"]', {
    duration: 800,
    multiple: true,
    init: true,
})

accordion.init()

accordion.on('init', (data) => {
    console.log(data);
})

accordion.on('change', (tab, panel) => {
    console.log(tab, panel);
})