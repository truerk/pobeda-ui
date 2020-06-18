import getCoord from '../utils/getCoord'

export default function dropdown() {
    document.addEventListener('click', (e) => {
        const dropdowns = document.querySelectorAll('[am-dropdown]')

        if (e.target.hasAttribute('am-dropdown-header') || e.target.closest('[am-dropdown-header]') || e.target.hasAttribute('am-dropdown-content')) {
            const dropdown = e.target.closest('[am-dropdown]');
            const dropdownContent = dropdown.querySelector('[am-dropdown-content]');
            const dropdownWrapper= dropdown.querySelector('[am-dropdown-wrapper]');
            let coord = getCoord(dropdownWrapper);

            if (!dropdown.hasAttribute('active')) {
                if (dropdownContent.hasAttribute('direction-old')) {
                    dropdownContent.setAttribute('direction', dropdownContent.getAttribute('direction-old'))
                    coord = getCoord(dropdownWrapper);
                }

                if (dropdownContent.getAttribute('direction') === 'left') {

                } else if (dropdownContent.getAttribute('direction') === 'top') {
                    if (coord.top <= 5) {
                        dropdownContent.setAttribute('direction', 'bottom')
                        dropdownContent.setAttribute('direction-old', 'top')
                    }
                } else if (dropdownContent.getAttribute('direction') === 'right') {

                } else if (dropdownContent.getAttribute('direction') === 'bottom' || !dropdownContent.hasAttribute('direction')) {
                    if ((coord.clientHeight - coord.bottom) <= 5 && (coord.top - coord.height) > 10) {
                        dropdownContent.setAttribute('direction', 'top')
                        dropdownContent.setAttribute('direction-old', 'bottom')
                    }
                }
            }

            dropdowns.forEach(dropdown1 => {
                if (dropdown1 !== dropdown) {
                    dropdown1.removeAttribute('active');
                }
            });

            if (e.target.closest('[am-dropdown]').hasAttribute('active')) {
                e.target.closest('[am-dropdown]').removeAttribute('active');
            } else {
                e.target.closest('[am-dropdown]').setAttribute('active', '');
            }
        } else if (e.target.closest('[am-dropdown-wrapper]')) {
            dropdowns.forEach(dropdown => {
                dropdown.removeAttribute('active');
            });
        } else {
            dropdowns.forEach(dropdown => {
                dropdown.removeAttribute('active');
            });
        }
    });
}