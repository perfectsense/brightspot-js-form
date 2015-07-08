import $ from 'jquery';
import bsp_form from 'bsp-form';

export default {
	defaults: {
		checkOnInput: true,
		eventNameInvalidField: 'bsp-field-invalid',
		eventNameSubmit: 'bsp-form-submit',
		eventNameReset: 'bsp-form-reset'
	},
	init($el, options) {
		var fieldSelector = $el.data('bsp-form-message');
		this.$el = $el;
		this.options = $.extend(true, {}, options, this.defaults);
		this.$field = $(fieldSelector);
		this.field = this.$field[0];
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
		if (this.options.checkOnInput) {
			this.$field.on('input', () => {
				if (bsp_form.fieldIsValid(this.field)) {
					self.resetField();
				} else {
					self.populateMessage();
				}
			});
		}
		this.$field.on(this.options.eventNameInvalidField, () => {
			self.populateMessage();
		});
		this.$field.on(this.options.eventNameReset, () => {
			self.resetField();
		});
		this.$field.on(this.options.eventNameSubmit, () => {
			self.resetField();
		});
	},
	populateMessage() {
		this.$el.html(this.field.validationMessage);
		this.$el.addClass('error');
	},
	resetField() {
		this.$el.removeClass('error').empty();
	}
};