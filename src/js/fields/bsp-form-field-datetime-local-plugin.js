import $ from 'jquery';
import bsp_utils from 'bsp-utils';
import bsp_form_field_datetime_local from 'bsp-form-field-datetime-local';

export default bsp_utils.plugin(false, 'bsp', 'form-field-datetime-local', {
    '_each': function(item) {
        var options = this.option(item);
        var moduleInstance = Object.create(bsp_form_field_datetime_local);
        moduleInstance.init($(item), options);
    }
});