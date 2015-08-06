import dt from 'datetimepicker';
import BspFormField from 'bsp-form-field';

class BspFormFieldDate extends BspFormField {

	setDefaults() {
		return {
			'test2': 'my override default'
		};
	}

	renderFallback() {
		this.el.setAttribute('type', 'text');

		// can't avoid using jquery here
		this.$el.datetimepicker({
			format: 'Y-m-d',
			timepicker: false
		});
	}

}

export default {
	init($el, options) {
		$(() => {
			new BspFormFieldDate($el, {
				'test': 'test'
			});
			var ua = $('html').data('bsp-useragent');
			if(!ua.isTouchDevice) {
				$el.attr('type','text');
				$el.datetimepicker({
					format: 'Y-m-d',
					timepicker: false
				});
			}
		});
	}
};