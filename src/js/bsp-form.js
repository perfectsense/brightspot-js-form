export default {
	defaults: {
		_allFieldsClean: true,
		fieldInvalidEventName: 'bsp-field-invalid',
		loadingClass: 'bsp-form-loading',
		validateNative: false
	},
	init($el, options) {
		if (!this.hasConstraintApi()) {
			return;
		}
		this.$el = $el;
		this.options = $.extend(true, {}, options, this.defaults);
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
		this.$el.removeClass(this.options.loadingClass).addClass('clean valid');
	},
	addEvents() {
		var self = this;
		this.$el.on('submit', (e) => {
			self.$el.addClass('submitted');
			if (!self.validate()) {
				self.triggerInvalidFieldEvent();
				e.preventDefault();
			}
		});
		this.$el.on('input', 'input, select', (e) => {
			self.makeFormDirty();
			self.makeFieldDirty(e.target);
			self.setFieldValidClasses(e.target);
		});
	},
	addEventsNative() {
		var self;
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
		this.$el.find('input').each((i, field) => {
			if (typeof field !== 'undefined') {
				if (field.validity && !field.validity.valid) {
					isValid = false;
					self.triggerInvalidFieldEvent(field);
				}
				self.setFieldValidClasses(this);
			}
		});
		return isValid;
	},
	validateNative() {
		/**
		 * To do any custom validation for native forms,
		 * override this function and use setCustomValidity and customError
		 * http://www.html5rocks.com/en/tutorials/forms/constraintvalidation/
		 */
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
	setFieldValidClasses(field) {
		if (!field.validity) {
			return;
		}
		if (field.validity.valid) {
			$(field).removeClass('invalid').addClass('valid');
		} else {
			$(field).removeClass('valid').addClass('invalid');
		}
	},
	triggerInvalidFieldEvent(field) {
		if (typeof field !== 'undefined') {
			$(field).trigger(this.options.fieldInvalidEventName);
		}
	}
};