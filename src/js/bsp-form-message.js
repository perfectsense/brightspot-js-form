import $ from 'jquery';
import bsp_form from 'bsp-form';

export default {
	defaults: {
		defaultMessage: 'There was an error with this field',
		eventNameInvalidField: 'bsp-field-invalid',
		eventNameReset: 'bsp-form-reset'
	},
	init($el, options) {
		var fieldSelector = $el.data('bsp-form-message');
		this.$el = $el;
		this.options = $.extend(true, {}, options, this.defaults);
		this.$field = $(fieldSelector);
		if (!this.$field.length || !bsp_form.hasConstraintApi()) {
			return;
		}
		this.addEvents();
		this.addClasses();
	},
	addClasses() {
		this.$el.addClass('bsp-form-message');
	},
	addEvents() {
		var self = this;
		this.$field.on(this.options.eventNameInvalidField, () => {
			self.populateMessage();
		});
		this.$field.on(this.options.eventNameReset, () => {
			self.resetField();
		});
	},
	populateMessage() {
		var title = this.$field.attr('title');
		if (title) {
			this.$el.html(title);
		} else {
			/**
			  * @todo this can be much improved, sending
			  * default messages for every invalid state
			  * or allowing custom messages
			  */
			this.$el.html(self.options.defaultMessage);
		}
		this.$el.addClass('error');
	},
	resetField() {
		this.$el.removeClass('error').empty();
	}
};