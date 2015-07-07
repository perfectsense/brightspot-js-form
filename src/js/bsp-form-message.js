import $ from 'jquery';
import bsp_form from 'bsp-form';

export default {
	defaults: {
		concat: false,
		constraints: [],
		eventName: 'bsp-field-invalid',
		fieldTitle: '',
		fieldSelector: undefined,
		messages: {
			'valueMissing': 'The %s field is missing a value',
			'patternMismatch': 'The %s validation pattern did not match'
		}
	},
	init($el, options) {
		this.$el = $el;
		this.options = $.extend(true, {}, options, this.defaults);
		this.$field = $(options.fieldSelector);
		if (!this.$field.length || !bsp_form.hasConstraintApi()) {
			return;
		}
		this.addEvents();
	},
	addEvents() {
		this.$field.on(this.options.eventName, (e) => {
			this.$el.html('An error was found');
			// tomorrow: loop through various scenarios to fill in correct message
		});
	}
};