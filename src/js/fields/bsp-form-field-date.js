import detect from 'bsp-feature-detect';
import dt from 'jquery.datetimepicker';
import BspFormField from 'bsp-form-field';

class BspFormFieldDate extends BspFormField {

	setDefaults() {
		return {
			'test2': 'my override default'
		};
	}

	renderFallback() {
		if (!detect.isTouchDevice) {
			this.el.setAttribute('type', 'text');

			// can't avoid using jquery here
			this.$el.datetimepicker({
				format: 'Y-m-d',
				timepicker: false
			});
		}
	}

}

export default {
	init($el, options) {
		$(() => {
			new BspFormFieldDate($el, options);
		});
	}
};