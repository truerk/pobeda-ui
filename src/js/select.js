import Select from '@ui/Select'


const select = new Select(document.querySelector('[am-select]'), {
    name: 'city'
})

select.on('change', data => {
    console.log(data);
})

select.on('render', data => {
    console.log(data);
})

select.on('destroy', data => {
    console.log(data);
})