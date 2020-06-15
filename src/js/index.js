import {ProgressController} from '../ui/components/ProgressController'

const progress = new ProgressController({
    name: 'progress',
    type: 'ring',
    percent: 50,
    ringColor: 'red'
})

document.querySelector('#add').addEventListener('click', () => {
    progress.setPercent(progress.getPercent() + 10)
})

document.querySelector('#remove').addEventListener('click', () => {
    progress.setPercent(progress.getPercent() - 10)
})

document.querySelector('#app').append(progress.build())