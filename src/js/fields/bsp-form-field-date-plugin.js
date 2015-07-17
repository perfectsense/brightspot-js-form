import $ from 'jquery';
import bsp_utils from 'bsp-utils';
import bsp_form_field_date from 'bsp-form-field-date';

export default bsp_utils.plugin(false, 'bsp', 'form-field-date', {
    '_each': function(item) {
        var options = this.option(item);
        var moduleInstance = Object.create(bsp_form_field_date);
        moduleInstance.init($(item), options);
    }
});