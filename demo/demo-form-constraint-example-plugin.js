import $ from 'jquery';
import bsp_utils from 'bsp-utils';
import demo_form_constraint_example from 'demo-form-constraint-example';

export default bsp_utils.plugin(false, 'demo', 'form-constraint-example', {
    '_each': function(item) {
        var options = this.option(item);
        var moduleInstance = Object.create(demo_form_constraint_example);
        moduleInstance.init($(item), options);
    }
});