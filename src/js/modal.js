import Modal from '@ui/Modal'


const modal = new Modal({
    modal: document.querySelector('[am-modal]')
})

document.querySelector('[am-modal-target="modal_bubble"]').addEventListener('click', () => modal.render())