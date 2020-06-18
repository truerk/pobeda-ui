import tooltip from './tooltip.js'
import dropdown from './dropdown.js'
import modal from './ModalController.js'
import select, {SelectController} from './SelectController.js'
import {ModalController} from './ModalController.js'
import {ProgressController} from './ProgressController.js'

(function() {
    // if (!Element.prototype.setAttributes) {
        Element.prototype.setAttributes = function(attr = false) {
            var node = this;
            if (attr !== false) {
                for (let key in attr) {
                    if (key !== '') {
                        node.setAttribute(key, attr[key])
                    }
                }
                return node
            } else {
                return;
            }
        };
    // }
})();

export { tooltip, dropdown, modal, select, ModalController, ProgressController, SelectController }