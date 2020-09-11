import { Tooltip, Modal, Progress, Select, Dropdown, Tabs, Accordion } from '../ui/js/index'
import Swiper from 'swiper'

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
    // console.log(data);
})

tab.on('change', (tab, content) => {
    // console.log(tab, content);
})

tab.init()