import $ from 'jquery';
import bsp_utils from 'bsp-utils';
import demo_form_constraint_async_example from 'demo-form-constraint-async-example';

export default bsp_utils.plugin(false, 'demo', 'form-constraint-async-example', {
    '_each': function(item) {
        var options = this.option(item);
        var moduleInstance = Object.create(demo_form_constraint_async_example);
        moduleInstance.init($(item), options);
    }
});