import detect from 'bsp-feature-detect';
import dt from 'jquery.datetimepicker';
import BspFormField from 'bsp-form-field';

class BspFormFieldMonth extends BspFormField {

	setDefaults() {
		return {
			format: 'Y-m',
	        formatDate: 'M y',
	        timepicker: false
    	};
	}

	renderFallback() {
		if (!detect.isTouchDevice) {
			this.el.setAttribute('type', 'text');
			this.$el.datetimepicker(this.options);
		}
	}

}

export default {
	init($el, options) {
		$(() => {
			new BspFormFieldMonth($el, options);
		});
	}
};