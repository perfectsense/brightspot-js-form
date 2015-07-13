import $ from 'jquery';
import bsp_utils from 'bsp-utils';

export default {
	name: "constraintBase",
	defaultsBase: {
		message: 'Field is invalid',
		inputEventThrottle: 1000
	},
	events: {
		eventNameSetMessage: 'setMessage'
	},
	init($el, options) {
		this.$field = $el;
		this.field = this.$field[0];
		this.$form = this.$field.closest('form');
		this.bsp_form = this.$form.data('bsp-form-instance');
		this.options = $.extend(true, {}, this.defaultsBase, this.defaults, options);
		if (!this.bsp_form.hasConstraintApi()) {
			return;
		}
		this.addEvents();
	},
	async() {
		if (!this.constraint) {
			this.constraint = this.bsp_form.asyncConstraint();
		}
	},
	addEvents() {
		var self = this;
		this.$field.on(this.bsp_form.events.eventNameInput, bsp_utils.throttle(
			self.options.inputEventThrottle,
			(e, formInstance) => {
				self.onInput.call(self, e, formInstance);
			}
		));
		this.$field.on(this.bsp_form.events.eventNameSubmit, (e, formInstance) => {
			self.onSubmit.call(self, e, formInstance);
		});
		this.$field.on(this.bsp_form.events.eventNameReset, (e, formInstance) => {
			self.onReset.call(self, e, formInstance);
		});
		this.$field.on(this.events.eventNameSetMessage, (e, data) => {
			if (data.key === self.name && data.value) {
				self.options.message = data.value;
			}
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
		if (this.constraint) {
			this.constraint.resolve();
			this.constraint = undefined;
		}
		this.triggerValidEvent();
	},
	setFieldInvalid() {
		this.field.setCustomValidity(this.options.message);
		if (this.constraint) {
			this.constraint.reject();
			this.constraint = undefined;
		}
		this.triggerInvalidEvent();
	},
	triggerInvalidEvent() {
		this.$field.trigger(this.bsp_form.events.eventNameFieldInvalid);	
	},
	triggerValidEvent() {
		this.$field.trigger(this.bsp_form.events.eventNameFieldValid);	
	},
	onInput(e, formInstance) {
		if (this.fieldPassesNativeValidation()) {
			this.async();
			this.validate();
		}
	},
	onReset() {
		this.setFieldValid();
	},
	onSubmit(e, formInstance) {
		if (this.fieldPassesNativeValidation()) {
			this.async();
			this.validate();
		}
	},
	validate() {}
};