import $ from 'jquery';
import bsp_form from 'bsp-form';

export default {
	defaults: {
		classError: 'error',
		checkOnInput: true,
		displayOnly: false,
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
		this.options = $.extend(true, {}, this.defaults, options);
		this.$field = $(fieldSelector);
		this.$form = this.$field.closest('form');
		this.bsp_form = this.$form.data('bsp-form-instance');
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
				if (bsp_form.fieldIsValid(self.field)) {
					self.resetField();
				} else {
					self.setMessage();
					self.writeMessage();
				}
			});
		}
		this.$field.on(bsp_form.events.eventNameInit, (e, form) => {
			self.options.useNativeUi = form.options.validateNative;
			self.setMessage();
		});
		this.$field.on(bsp_form.events.eventNameFieldInvalid, (e, form) => {
			self.setMessage();
			self.writeMessage();
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
				self.setMessage();
			});
		}
	},
	setMessage() {
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
		if (this.options.useNativeUi && !this.options.displayOnly) {
			this.field.setCustomValidity(message);
		} else {
			this._message = message;
		}
	},
	writeMessage() {
		if (!this.options.useNativeUi) {
			this.$el.addClass(this.options.classError).html(this._message);
		}
	},
	interpolateFieldValues(str) {
		var name = this.$field.attr('name');
		var pattern = this.$field.attr('pattern');
		var title = this.$field.attr('title');
		var titleLowerCase = title.toLowerCase();
		var titleUpperCase = title.toUpperCase();
		var type = this.$field.attr('type');
		var value = this.$field.val();
		str = str.replace(/\{name\}/, name);
		str = str.replace(/\{pattern\}/, pattern);
		str = str.replace(/\{title\}/, title);
		str = str.replace(/\{titleLowerCase\}/, titleLowerCase);
		str = str.replace(/\{titleUpperCase\}/, titleUpperCase);
		str = str.replace(/\{type\}/, type);
		str = str.replace(/\{value\}/, value);
		return str;
	},
	resetField() {
		this.$el.removeClass(this.options.classError).empty();
	}
};