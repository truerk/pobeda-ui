import {dropdown, tooltip, select, modal, ModalController, SelectController, ProgressController, DropdownController, Tabs, Accordion} from '../ui/js/index'
import utils from '../ui/utils/utils'
import EventEmitter from '../ui/utils/EventEmitter'
import Swiper from 'swiper'

// import './forms'
// import './tabs'
// import './accordion'

tooltip()
dropdown()
select()
modal()

const accordion = new Accordion('[am-accordion="simple"]', {
    init: false
})

const accordionMultiple = new Accordion('[am-accordion="multiple"]', {
    duration: 400,
    multiple: false,
    init: true,
})

accordion.on('init', (data) => {
    console.log(data);
})

accordion.on('toggle', (tab, panel) => {
    console.log(tab, panel);
})

accordion.init()
