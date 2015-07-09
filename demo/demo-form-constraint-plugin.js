import $ from 'jquery';
import bsp_utils from 'bsp-utils';
import demo_form_constraint from 'demo-form-constraint';

export default bsp_utils.plugin(false, 'bsp', 'form-constraint-demo', {
    '_each': function(item) {
        var options = this.option(item);
        var moduleInstance = Object.create(demo_form_constraint);
        moduleInstance.init($(item), options);
    }
});