import Select from '@ui/Select'


const select = new Select(document.querySelector('[am-select]'), {
    name: 'city',
    placeholderOption: 'Нет значений',
    placeholder: 'Выберите значение',
    options: [
        // { value: '123', label: 'Нет значений 123'}
    ]
})

// const select1 = new Select(document.querySelector('[am-select="city2"]'), {
//     name: 'city2',
//     options: [
//         // { value: '321', label: 'asdasd'}
//     ]
// })

select.on('change', data => {
    console.log('change', data);
})

select.on('render', data => {
    console.log('render', data);
})

select.on('destroy', data => {
    console.log('destroy', data);
})

// select1.on('change', data => {
//     console.log('change1', data);
// })

// select1.on('render', data => {
//     console.log('render1', data);
// })

// select1.on('destroy', data => {
//     console.log('destroy1', data);
// })