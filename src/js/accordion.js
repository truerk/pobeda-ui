import { Tooltip, Modal, Progress, Select, Dropdown, Tabs, Accordion } from '../ui/js/index'

const accordion = new Accordion('[am-accordion="simple"]', {
    init: false
})

const accordionMultiple = new Accordion('[am-accordion="multiple"]', {
    duration: 400,
    multiple: false,
    init: true,
})

accordion.on('init', (data) => {
    // console.log(data);
})

accordion.on('toggle', (tab, panel) => {
    // console.log(tab, panel);
})

accordion.init()
