import $ from 'jquery';
import bsp_utils from 'bsp-utils';
import bsp_form_field_month from 'bsp-form-field-month';

export default bsp_utils.plugin(false, 'bsp', 'form-field-month', {
    '_each': function(item) {
        var options = this.option(item);
        var moduleInstance = Object.create(bsp_form_field_month);
        moduleInstance.init($(item), options);
    }
});