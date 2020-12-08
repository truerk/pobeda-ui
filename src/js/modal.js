import Modal from '@ui/Modal'


const modal = new Modal({
    modal: document.querySelector('[am-modal]')
})

const modalBubble = Modal.bubbleInit({}, (modal) => {
    console.log(modal);
})

// const modal1 = new Modal({
//     modal: document.querySelector('[am-modal="modal_bubble1"]')
// })

document.querySelector('[am-modal-target="modal_bubble"]').addEventListener('click', () => modal.render())

// document.querySelector('[am-modal-target="modal_bubble1"]').addEventListener('click', () => modal1.render())