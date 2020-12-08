import Collapse from '@ui/Collapse'

let collapse = document.querySelector('[am-collapse]')

collapse = new Collapse([
    '[am-collapse="1"]',
    '[am-collapse="2"]'
], {
    init: false
})

collapse[0].on('init', (data) => {
    console.log(data);
})

collapse[1].on('toggle', (data) => {
    console.log(data);
})

collapse[0].init()
collapse[1].init()

collapse = Collapse.bubbleInit()
