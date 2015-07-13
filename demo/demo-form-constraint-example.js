import $ from 'jquery';
import bsp_form from 'bsp-form';
import bsp_form_constraint_base from 'bsp-form-constraint-base';

export default {
	
	__proto__: bsp_form_constraint_base, // jshint ignore:line

	name: "constraintExample",

	defaults: {
		message: 'Field content must be the word demo'
	},

	validate() {
		if (this.$field.val() === 'demo') {
			this.setFieldValid();
		} else {
			this.setFieldInvalid();
		}
	}

};