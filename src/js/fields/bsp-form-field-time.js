import detect from 'bsp-feature-detect';
import dt from 'jquery.datetimepicker';
import BspFormField from 'bsp-form-field';

class BspFormFieldTime extends BspFormField {
	
	addLeadingZero(num) {
		if (num < 10) {
			return "0" + num;
		} else {
			return num;
		}
	}

	formattedInputTime(str) {
		// input format is 13:00
		// @see http://www.w3.org/TR/html-markup/datatypes.html#form.data.time
		var d = new Date(str);
		return this.addLeadingZero( d.getHours() ) + ':' + this.addLeadingZero( d.getMinutes() );
	}

	setDefaults() {
		return {
			datepicker: false,
			formatTime: 'g:ia'
		};
	}

	renderFallback() {
		var self = this;
		if (!detect.isTouchDevice) {
			this.el.setAttribute('type', 'text');
			this.options.onChangeDateTime = (ct, $i) => {
				$i.val( self.formattedInputTime(ct) );
			};
			this.$el.datetimepicker(this.options);
		}
	}

}

export default {
	init($el, options) {
		$(() => {
			new BspFormFieldTime($el, options);
		});
	}
};