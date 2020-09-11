import utils from '../ui/utils'

const button = document.querySelector('button[type="submit"]')
const form = document.querySelector('form')
const inputs = utils.form.getFields(form)

utils.form.clear(document.querySelector('textarea'))
// utils.mask.float(document.querySelector('textarea'))
// utils.mask.string(document.querySelector('input[name="surname"]'))
// utils.mask.string(document.querySelector('input[name="name"]'))
// utils.mask.string(document.querySelector('input[name="patronymic"]'))
// utils.mask.phone(document.querySelector('input[name="phone"]'))

inputs.forEach(element => {
    let options = {empty: true}

    if (element.name === 'surname' || element.name ===  'name' || element.name ===  'patronymic') {
        options.text = true
    }

    if (element.name === 'phone') {
        options.phone = true
    }

    if (element.name === 'email') {
        options.email = true
    }

    utils.form.handlerChange(element.container, options)
});

button.addEventListener('click', (e) => {
    e.preventDefault()

    const inputs = utils.form.getFields(form)
    let error = {}

    inputs.forEach(element => {
        let options = {empty: true}

        if (element.name === 'surname' || element.name ===  'name' || element.name ===  'patronymic') {
            options.text = true
            options.empty = true
        }

        if (element.name === 'phone') {
            options.empty = true
            options.phone = true
        }

        if (element.name === 'email') {
            options.email = true
        }

        if (element.name === 'message') {
            options.empty = true
        }

        error = utils.form.validate(element, options, error)
    });

    // console.log(1);
    if (utils.form.checkError(error)) return
    // console.log(2);

})