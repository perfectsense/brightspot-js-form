import $ from 'jquery';
import bsp_form from 'bsp-form';
import bsp_form_constraint_base from 'bsp-form-constraint-base';

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
		observeMessageInterval: 100,
		observeMessageChecks: 50,
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
		this.setUiMode();
		this.addEvents();
		this.addClasses();
		this.fetchServerMessages();
		this.setObserveMessageChanges();
		this.populateMessages();
		this.setMessage();
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
		this.$field.on(bsp_form.events.eventNameFieldInvalid, (e, form) => {
			self.setMessage();
			self.writeMessage();
		});
		this.$field.on(
			[
				bsp_form.events.eventNameFieldValid,
				bsp_form.events.eventNameReset,
				bsp_form.events.eventNameSubmit
			].join(' '),
			(e, form) => {
				self.resetField();
			}
		);
	},
	setUiMode() {
		this.options.useNativeUi = this.bsp_form.options.validateNative;
	},
	fetchServerMessages() {
		var self = this;
		if (this.options.messagesUrl) {
			$.get(this.options.messagesUrl).then((messages) => {
				self.options.messages = messages;
				self.populateMessages();
				self.setMessage();
			});
		}
	},
	populateMessages() {
		var self = this;
		$.each(this.options.messages, (key, value) => {
			if (!(key in self.field.validity)) {
				self.$field.trigger('setMessage', {
					key: key,
					value: self.interpolateFieldValues( value )
				});
			}
		});
	},
	setMessage() {
		var firstErrorFound = false;
		var message = '';
		var self = this;
		if (bsp_form_constraint_base.fieldPassesNativeValidation(self.field)) {
			this._message = self.field.validationMessage;
		} else {
			$.each(this.options.messages, (key, value) => {
				if (!self.field.validity.valid) {
					if (key in self.field.validity && self.field.validity[key] === true && !firstErrorFound) {
						message = self.interpolateFieldValues( value );
						firstErrorFound = true;
					}
				}
			});
			if (this.options.useNativeUi && !this.options.displayOnly) {
				this.field.setCustomValidity(message);
			} else {
				this._message = message;
			}
		}
	},
	/** Object.observe would be nice here, but is not widely supported */
	setObserveMessageChanges() {
		var checks = 0;
		var self = this;
		this._observeMessagesInterval = setInterval(() => {
			if (checks >= self.options.observeMessageChecks) {
				clearInterval(self._observeMessagesInterval);
			}
			self.populateMessages();
			checks++;
		}, this.options.observeMessageInterval);
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