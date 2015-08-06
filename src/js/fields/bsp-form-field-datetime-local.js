import detect from 'bsp-feature-detect';
import dt from 'jquery.datetimepicker';
import BspFormField from 'bsp-form-field';

class BspFormFieldDatetimeLocal extends BspFormField {

	formattedInputTime(str) {
		// input format is 1996-12-19T16:39:57
		// @see http://www.w3.org/TR/html-markup/datatypes.html#form.data.datetime-local
		var d = new Date(str);
		return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + 'T' + d.getHours() + ':' + d.getMinutes();
	}

	setDefaults() {
		return {
			lang: 'en',			
			step: 15,
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
			new BspFormFieldDatetimeLocal($el, options);
		});
	}
};