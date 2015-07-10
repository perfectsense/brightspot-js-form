import $ from 'jquery';
import bsp_utils from 'bsp-utils';
import bsp_form_constraint_matches from 'bsp-form-constraint-matches';

export default bsp_utils.plugin(false, 'bsp', 'form-constraint-matches', {
    '_each': function(item) {
        var options = this.option(item);
        var moduleInstance = Object.create(bsp_form_constraint_matches);
        moduleInstance.init($(item), options);
    }
});