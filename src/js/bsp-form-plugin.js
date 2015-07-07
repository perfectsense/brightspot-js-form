import $ from 'jquery';
import bsp_utils from 'bsp-utils';
import bsp_form from 'bsp-form';

export default bsp_utils.plugin(false, 'bsp', 'form', {
    '_each': function(item) {
        var options = this.option(item);
        var moduleInstance = Object.create(bsp_form);
        moduleInstance.init($(item), options);
    }
});