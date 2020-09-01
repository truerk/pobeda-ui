import {dropdown, tooltip, select, modal, ModalController, SelectController, ProgressController, DropdownController, Tabs} from '../ui/js/index'
import utils from '../ui/utils/utils'
import Swiper from 'swiper'

import './forms'
import {Tabs} from '@ui/js'

tooltip()
dropdown()
select()
modal()


const tab = new Tabs('[am-tabs="controller"]', {
    active: true
})

const tab1 = new Tabs('[am-tabs="swiper"]', {
    active: false,
    init: true
})

let tabsSlider = new Swiper('[am-tabs="swiper"]', {
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 10,
});

tab.on('init', (data) => {
    console.log(data);
})

tab.on('change', (tab, content) => {
    console.log(tab, content);
})

tab.init()




