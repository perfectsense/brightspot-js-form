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
			expect(form.options.test).toBe('test');
		});

		it('should stop executing if hasConstraintApi returns false', () => {
			spyOn(form, 'hasConstraintApi').and.returnValue(false);
			form.init($el, {});
			expect(form.$el).toBe(undefined);
		});

		it('should call expected methods', () => {
			spyOn(form, 'addEvents');
			spyOn(form, 'setNoValidate');
			spyOn(form, 'addFormLoadClasses');
			spyOn($el, 'data');
			form.init($el, {});
			expect(form.addEvents).toHaveBeenCalled();
			expect(form.setNoValidate).toHaveBeenCalled();
			expect(form.addFormLoadClasses).toHaveBeenCalled();
			expect($el.data).toHaveBeenCalledWith('bsp-form-instance', form);
		});

	});

	describe('hasConstraintApi specs', () => {
		var form;

		beforeEach(() => {
			form = Object.create(bsp_form);
		});

		it('should return true if dummy element validity exists', () => {
			spyOn(document, 'createElement').and.returnValue({
				validity: {}
			});
			expect(form.hasConstraintApi()).toBe(true);
		});

		it('should return false if dummy element validity does not exist', () => {
			spyOn(document, 'createElement').and.returnValue({
				validity: undefined
			});
			expect(form.hasConstraintApi()).toBe(false);
		});
	});

	xdescribe('addFormLoadClasses specs', () => {

		var form;

		beforeEach(() => {
			form = Object.create(bsp_form);
			form.$el = $('<div></div>');
		});

		it('should remove loading class', () => {
			spyOn(form.$el, 'removeClass');
			form.options = {
				loadingClass: 'test'
			};
			form.addFormLoadClasses();
			expect(form.$el.removeClass).toHaveBeenCalledWith('test');
		});

	});

});