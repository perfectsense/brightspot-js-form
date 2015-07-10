import $ from 'jquery';
import bsp_form from 'bsp-form';
import bsp_form_constraint_base from 'bsp-form-constraint-base';

export default {
	
	__proto__: bsp_form_constraint_base, // jshint ignore:line

	defaults: {
		message: 'Field content must be the word async'
	},

	validate(e, form) {

		var deferred = form.async();
		var self = this;

		setTimeout(() => {
			if (self.$field.val() === 'async') {
				self.setFieldValid();
			} else {
				self.setFieldInvalid();
			}
			deferred.resolve();
		}, 500);

	}

};