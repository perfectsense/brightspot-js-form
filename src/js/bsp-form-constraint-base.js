import $ from 'jquery';
import bsp_form from 'bsp-form';

export default {
	defaults: {
		message: 'Field is invalid'
	},
	init($el, options) {
		this.$field = $el;
		this.field = this.$field[0];
		this.options = $.extend(true, {}, this.defaults, options);
		if (!bsp_form.hasConstraintApi()) {
			return;
		}
		this.addEvents();
	},
	addEvents() {
		var self = this;
		this.$field.on(bsp_form.events.eventNameInput, (e, formInstance) => {
			self.onInput.call(self, e, formInstance);
		});
		this.$field.on(bsp_form.events.eventNameSubmit, (e, formInstance) => {
			self.onSubmit.call(self, e, formInstance);
		});
		this.$field.on(bsp_form.events.eventNameReset, (e, formInstance) => {
			self.onReset.call(self, e, formInstance);
		});
	},
	fieldPassesNativeValidation(field) {
		var isValid = true;
		if (typeof field !== 'object') {
			field = this.field;
		}
		$.each(field.validity, (key, value) => {
			if (key !== 'valid' && key !== 'customError') {
				if (value === true) {
					isValid = false;
				}
			}
		});
		return isValid;
	},
	setFieldValid() {
		this.field.setCustomValidity('');
		this.triggerValidEvent();
	},
	setFieldInvalid() {
		this.field.setCustomValidity(this.options.message);
		this.triggerInvalidEvent();
	},
	triggerInvalidEvent() {
		this.$field.trigger(bsp_form.events.eventNameFieldInvalid);	
	},
	triggerValidEvent() {
		this.$field.trigger(bsp_form.events.eventNameFieldValid);	
	},
	onInput(e, formInstance) {
		if (this.fieldPassesNativeValidation()) {
			this.validate(e, formInstance);
		}
	},
	onReset() {
		this.setFieldValid();
	},
	onSubmit(e, formInstance) {
		if (this.fieldPassesNativeValidation()) {
			this.validate(e, formInstance);
		}
	},
	validate() {}
};