import $ from 'jquery';
import bsp_form from 'bsp-form';

export default {
	defaults: {
		checkOnInput: true,
		messages: {
			badInput: '{title} bad input',
			patternMismatch: '{title} pattern mismatch',
			rangeOverflow: '{title} range overflow',
			rangeUnderflow: '{title} range underflow',
			stepMismatch: '{title} step mismatch',
			tooLong: '{title} is too long',
			tooShort: '{title} is too short',
			typeMismatch: 'Invalid value "{value}" for {titleLowerCase}',
			valueMissing: 'Please enter a value for {titleLowerCase}'
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
			this.$field.on(bsp_form.events.eventNameInput, (e, form) => {
				self.setIsNativeUi(form);
				if (bsp_form.fieldIsValid(self.field)) {
					self.resetField();
				} else {
					self.populateMessage();
				}
			});
		}
		this.$field.on(bsp_form.events.eventNameFieldInvalid, (e, form) => {
			self.populateMessage();
		});
		this.$field.on(bsp_form.events.eventNameFieldValid, (e, form) => {
			self.resetField();
		});
		this.$field.on(bsp_form.events.eventNameReset, (e, form) => {
			self.resetField();
		});
		this.$field.on(bsp_form.events.eventNameSubmit, (e, form) => {
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
					message = self.interpolateFieldValues( self.options.messages[key] );
				}
			}
		});
		this.$el.html(message);
	},
	interpolateFieldValues(str) {
		var pattern = this.$field.attr('pattern');
		var title = this.$field.attr('title');
		var titleLowerCase = title.toLowerCase();
		var titleUpperCase = title.toUpperCase();
		var type = this.$field.attr('type');
		var value = this.$field.val();
		str = str.replace(/\{pattern\}/, pattern);
		str = str.replace(/\{title\}/, title);
		str = str.replace(/\{titleLowerCase\}/, titleLowerCase);
		str = str.replace(/\{titleUpperCase\}/, titleUpperCase);
		str = str.replace(/\{type\}/, type);
		str = str.replace(/\{value\}/, value);
		return str;
	},
	resetField() {
		this.$el.removeClass('error').empty();
	}
};