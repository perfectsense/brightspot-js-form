export default {
	defaults: {
		_allFieldsClean: true,
		classClean: 'clean',
		classDirty: 'dirty',
		classSubmitted: 'submitted',
		loadingClass: 'bsp-form-loading',
		selectorAllFields: 'input, select, textarea',
		validateNative: false
	},
	events: {
		eventNameFieldValid: 'bsp-field-valid',
		eventNameFieldInvalid: 'bsp-field-invalid',
		eventNameInput: 'bsp-field-input',
		eventNameReset: 'bsp-form-reset',
		eventNameSubmit: 'bsp-form-submit'
	},
	init($el, options) {
		if (!this.hasConstraintApi()) {
			return;
		}
		this.$el = $el;
		this.options = $.extend(true, {}, this.defaults, options);
		this.setNoValidate();
		this.addEvents();
		$el.data('bsp-form-instance', this);
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
	addSubmitClass() {
		this.$el.addClass(this.options.classSubmitted);
	},
	addEvents() {
		this.addSubmitEvents();
		this.addInputEvents();
		this.addResetEvents();
	},
	addInputEvents() {
		var self = this;
		this.$el.on('input', this.options.selectorAllFields, (e) => {
			self.makeFormDirty();
			self.makeFieldDirty(e.target);
			$(e.target).trigger(self.events.eventNameInput, self);
		});
	},
	addResetEvents() {
		var self = this;
		this.$el.on('reset', () => {
			self.resetForm();
		});
	},
	addSubmitEvents() {
		var self = this;
		this.$el.on('submit', (e) => {
			self.addSubmitClass();
			self.triggerFormSubmitEvent();
			if (!self.validate()) {
				e.preventDefault();
			}
		});
	},
	setNoValidate() {
		if (!this.options.validateNative) {
			this.$el.attr('novalidate', '');
		}
	},
	validate() {
		var isValid = true;
		var self = this;
		this.$el.find(this.options.selectorAllFields).each((i, field) => {
			if (!self.fieldIsValid(field)) {
				self.triggerInvalidFieldEvent(field);
				isValid = false;
			}
		});
		return isValid;
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
		$el.addClass(this.options.classDirty).removeClass(this.options.classClean);
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
			$(field).trigger(this.events.eventNameFieldInvalid, this);
		}
	},
	triggerFormSubmitEvent() {
		this.$el.find(this.options.selectorAllFields).trigger(this.events.eventNameSubmit, this);
	},
	resetForm() {
		this.$el
			.removeClass([this.options.classDirty,this.options.classSubmitted].join(' '))
			.addClass(this.options.classClean);
		this.$el.find(this.options.selectorAllFields)
			.removeClass(this.options.classDirty)
			.addClass(this.options.classClean)
			.trigger(this.events.eventNameReset, this);
		this._allFieldsClean = true;
	}
};