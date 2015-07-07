import $ from 'jquery';
import bsp_utils from 'bsp-utils';
import bsp_form from 'bsp-form';

describe('bsp-form', () => {

	describe('init specs', () => {

		var form;
		var $el;

		beforeEach(() => {
			form = Object.create(bsp_form);
			$el = $('<div></div>');
		});

		it('should save arguments to the object on init', () => {
			var options = { 'test': 'test' };
			form.init($el, options);
			expect(form.$el).toBe($el);
			expect(form.options).toBe(options);
		});

		it('should call configure', () => {
			spyOn(form, 'configure');
			form.init($el, {});
			expect(form.configure).toHaveBeenCalled();
		});

		it('should call addEvents', () => {
			spyOn(form, 'addEvents');
			form.init($el, {});
			expect(form.addEvents).toHaveBeenCalled();
		});

	});

});