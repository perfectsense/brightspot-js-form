import $ from 'jquery';
import bsp_form from 'bsp-form';

export default {
	defaults: {
		checkOnInput: true,
		eventNameInvalidField: 'bsp-field-invalid',
		eventNameInput: 'bsp-field-input',
		eventNameSubmit: 'bsp-form-submit',
		eventNameReset: 'bsp-form-reset',
		useNativeUi: false
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
			this.$field.on(this.options.eventNameInput, (e, form) => {
				self.setIsNativeUi(form);
				if (bsp_form.fieldIsValid(self.field)) {
					self.resetField();
				} else {
					self.populateMessage();
				}
			});
		}
		this.$field.on(this.options.eventNameInvalidField, (e, form) => {
			this.setIsNativeUi(form);
			self.populateMessage();
		});
		this.$field.on(this.options.eventNameReset, (e, form) => {
			this.setIsNativeUi(form);
			self.resetField();
		});
		this.$field.on(this.options.eventNameSubmit, (e, form) => {
			this.setIsNativeUi(form);
			self.resetField();
		});
	},
	setIsNativeUi(form) {
		if (typeof form === 'object' && form.options && form.options.validateNative === true) {
			this.options.useNativeUi = true;
		} else {
			this.options.useNativeUi = false;
		}
	},
	populateMessage() {
		if (!this.options.useNativeUi) {
			this.$el.html(this.field.validationMessage);
			this.$el.addClass('error');
		}
	},
	resetField() {
		this.$el.removeClass('error').empty();
	}
};