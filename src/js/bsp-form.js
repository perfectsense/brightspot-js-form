export default {
	defaults: {
		_allFieldsClean: true,
		eventNameFieldInvalid: 'bsp-field-invalid',
		eventNameReset: 'bsp-form-reset',
		eventNameSubmit: 'bsp-form-submit',
		loadingClass: 'bsp-form-loading',
		validateNative: false
	},
	init($el, options) {
		if (!this.hasConstraintApi()) {
			return;
		}
		this.$el = $el;
		this.options = $.extend(true, {}, this.defaults, options);
		if (this.options.validateNative) {
			this.addEventsNative();
		} else {
			this.setNoValidate();
			this.addEvents();
			$el.data('bsp-form-instance', this);
		}
		this.addFormLoadClasses();
	},
	hasConstraintApi() {
		var dummy = document.createElement('input');
		return typeof dummy.validity === 'object';
	},
	addFormLoadClasses() {
		this.$el.removeClass(this.options.loadingClass);
		this.resetForm();
	},
	addEvents() {
		var self = this;
		this.$el.on('submit', (e) => {
			self.$el.addClass('submitted');
			self.triggerFormSubmitEvent();
			if (!self.validate()) {
				e.preventDefault();
			}
		});
		this.$el.on('input', 'input, select', (e) => {
			self.makeFormDirty();
			self.makeFieldDirty(e.target);
		});
		this.$el.on('reset', () => {
			self.resetForm();
		});
	},
	addEventsNative() {
		var self = this;
		this.$el.on('input submit', () => {
			self.validateNative();
		});
	},
	setNoValidate() {
		this.$el.attr('novalidate', '');
	},
	validate() {
		var isValid = true;
		var self = this;
		this.$el.find('input, select').each((i, field) => {
			if (!self.fieldIsValid(field)) {
				self.triggerInvalidFieldEvent(field);
				isValid = false;
			}
		});
		return isValid;
	},
	/**
	 * To do any custom validation for native forms, override this
	 * function and use setCustomValidity to set an error
	 * See demo/demo-plugin.js for an example
	 */
	validateNative() {

	},
	fieldIsValid(field) {
		if (typeof field !== 'undefined') {
			if (field.validity && !field.validity.valid) {
				return false;
			}
		}
		return true;
	},
	makeElementDirty($el) {
		$el.addClass('dirty').removeClass('clean');
	},
	makeFieldDirty(field) {
		this.makeElementDirty($(field));
	},
	makeFormDirty() {
		if (this._allFieldsClean) {
			this._allFieldsClean = false;
			this.makeElementDirty(this.$el);
		}
	},
	triggerInvalidFieldEvent(field) {
		if (typeof field !== 'undefined') {
			$(field).trigger(this.options.eventNameFieldInvalid);
		}
	},
	triggerFormSubmitEvent() {
		this.$el.find('input, select').trigger(this.options.eventNameSubmit);
	},
	resetForm() {
		this.$el.removeClass('dirty submitted').addClass('clean');
		this.$el.find('input, select')
			.removeClass('dirty')
			.addClass('clean')
			.trigger(this.options.eventNameReset);
		this._allFieldsClean = true;
	}
};