import Pikaday from 'pikaday';

export default {
	init($el, options) {
		$(() => {
			var ua = $('html').data('bsp-useragent');
			if(!ua.isTouchDevice) {
				$el.attr('type','text');
				new Pikaday({
					field: $el[0]
				});
			}
		});
	}
};