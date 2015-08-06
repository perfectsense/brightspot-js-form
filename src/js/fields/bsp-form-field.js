import $ from 'jquery';

/** @see http://ilikekillnerds.com/2015/02/what-are-weakmaps-in-es6/ */
const privateData = new WeakMap();

export default class BspFormField {

	get defaults() {
		return privateData.get(this).defaults;
	}
	set defaults(defaults = {}) {
		privateData.set(this, { "defaults": defaults });
	}
	setDefaults() {
		return {};
	}

	get options() {
		return privateData.get(this).options;
	}
	set options(options) {
		var merged = $.extend(true, {}, this.defaults, options);
		privateData.set(this, { "options": merged });
	}

	constructor($el, options) {
		this.defaults = this.setDefaults();
		this.$el = $el;
		this.el = $el[0];
		this.options = options;
		this.renderFallback();
	}

	renderFallback() {}
}