import $ from 'jquery';
import bsp_form from 'bsp-form';

export default {
	/**
	 * This is valid but will choke older jshint in many
	 * editors, see: https://github.com/jshint/jshint/issues/2371
	 */
	__proto__: bsp_form, // jshint ignore:line
	
	init($el, options) {
		options.validateNative = true; // for dev convenience to toggle between native and non-native
		super.init($el, options);
	},
	addEvents() {
		var self = this;
		this.$el.on('reset', () => {
			self.resetPasswordFieldsCustomValidity();
		});
		super.addEvents();
	},
	passwordFieldsValid() {
		var $pw1 = this.$el.find('#pw1');
		var pw1 = $pw1[0];
		var $pw2 = this.$el.find('#pw2');
		var pw2 = $pw2[0];

		this.resetPasswordFieldsCustomValidity();

		if (this.fieldIsValid(pw1) && this.fieldIsValid(pw2)) {
			/** password fields pass native validation, so do custom validation */
			if ($pw1.val() !== $pw2.val()) {
				pw2.setCustomValidity('Passwords do not match');
			}
		}
	},
	resetPasswordFieldsCustomValidity() {
		this.$el.find('#pw2')[0].setCustomValidity('');
	},
	validate() {
		this.passwordFieldsValid();
		return super.validate();
	},
	validateNative() {
		this.passwordFieldsValid();
	}
};