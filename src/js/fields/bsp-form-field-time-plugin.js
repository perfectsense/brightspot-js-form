import $ from 'jquery';
import bsp_utils from 'bsp-utils';
import bsp_form_field_time from 'bsp-form-field-time';

export default bsp_utils.plugin(false, 'bsp', 'form-field-time', {
    '_each': function(item) {
        var options = this.option(item);
        var moduleInstance = Object.create(bsp_form_field_time);
        moduleInstance.init($(item), options);
    }
});