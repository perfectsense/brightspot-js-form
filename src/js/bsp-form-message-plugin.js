import $ from 'jquery';
import bsp_utils from 'bsp-utils';
import bsp_form_message from 'bsp-form-message';

export default bsp_utils.plugin(false, 'bsp', 'form-message', {
    '_each': function(item) {
        var options = this.option(item);
        var moduleInstance = Object.create(bsp_form_message);
        moduleInstance.init($(item), options);
    }
});