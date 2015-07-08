import $ from 'jquery';
import bsp_utils from 'bsp-utils';
import demo_form from 'demo';

export default bsp_utils.plugin(false, 'bsp', 'form-demo', {
    '_each': function(item) {
        var options = this.option(item);
        var moduleInstance = Object.create(demo_form);
        moduleInstance.init($(item), options);
    }
});