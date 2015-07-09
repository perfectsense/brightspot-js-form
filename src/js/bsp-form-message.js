import $ from 'jquery';
import bsp_form from 'bsp-form';

export default {
	defaults: {
		checkOnInput: true,
		eventNameInvalidField: 'bsp-field-invalid',
		eventNameInput: 'bsp-field-input',
		eventNameSubmit: 'bsp-form-submit',
		eventNameReset: 'bsp-form-reset',
		/**
		 * @todo write better default messages,
		 * possibly different defaults for different fields types,
		 * possibly allow field name, id, and value tokens
		 */
		messages: {
			badInput: 'Bad input error',
			patternMismatch: 'Pattern mismatch error',
			rangeOverflow: 'Range overflow error',
			rangeUnderflow: 'Range underflow error',
			stepMismatch: 'Step mistmatch error',
			tooLong: 'Too long error',
			tooShort: 'Too short error',
			typeMismatch: 'Type mismatch error',
			valueMissing: 'Value missing error'
		},
		messagesUrl: undefined,
		useNativeUi: false,
		useNativeMessages: false
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
		this.fetchServerMessages();
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
	fetchServerMessages() {
		var self = this;
		if (this.options.messagesUrl) {
			$.get(this.options.messagesUrl).then((messages) => {
				self.options.messages = messages;
			});
		}
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
			if (this.options.useNativeMessages) {
				this.$el.html(this.field.validationMessage);
			} else {
				this.populateNonNativeMessage();
			}
			this.$el.addClass('error');
		}
	},
	populateNonNativeMessage() {
		var firstErrorFound = false;
		var message = '';
		var self = this;
		$.each(this.field.validity, (key, value) => {
			if (key !== 'valid' && !firstErrorFound && value) {
				firstErrorFound = true;
				if (key === 'customError') {
					message = self.field.validationMessage;
				} else {
					message = self.options.messages[key];
				}
			}
		});
		this.$el.html(message);
	},
	resetField() {
		this.$el.removeClass('error').empty();
	}
};