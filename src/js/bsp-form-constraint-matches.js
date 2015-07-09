import $ from 'jquery';
import bsp_form from 'bsp-form';
import bsp_form_constraint_base from 'bsp-form-constraint-base';

export default {

	__proto__: bsp_form_constraint_base, // jshint ignore:line

	init($el, options) {
		this.$match = $( $el.data('bsp-form-constraint-matches') );
		if (!this.$match.length) {
			return;
		}
		this.match = this.$match[0];
		super.init($el, options); 
	},
	addEvents() {
		var self = this;
		this.$match.on(bsp_form.events.eventNameInput, (e, form) => {
			if (self.$field.hasClass(form.options.classDirty)) {
				self.validate();
			}
		});
		super.addEvents();
	},
	fieldPassesNativeValidation() {
		return super.fieldPassesNativeValidation() && super.fieldPassesNativeValidation(this.match);
	},
	validate() {
		if (this.$field.val() === this.$match.val()) {
			this.setFieldValid();
		} else {
			this.setFieldInvalid();
		}
	}
};