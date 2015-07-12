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

	describe('addFormLoadClasses specs', () => {

		var form;

		beforeEach(() => {
			form = Object.create(bsp_form);
			form.$el = $('<div></div>');
		});

		it('should remove loading class', () => {
			spyOn(form.$el, 'removeClass');
			spyOn(form, 'resetForm');
			form.options = {
				loadingClass: 'test'
			};
			form.addFormLoadClasses();
			expect(form.$el.removeClass).toHaveBeenCalledWith('test');
		});

		it('should call resetForm', () => {
			spyOn(form.$el, 'removeClass');
			spyOn(form, 'resetForm');
			form.options = {
				loadingClass: 'test'
			};
			form.addFormLoadClasses();
			expect(form.resetForm).toHaveBeenCalled();
		});

	});

	describe('addSubmitClass specs', () => {
		var form;

		beforeEach(() => {
			form = Object.create(bsp_form);
			form.$el = $('<div></div>');
		});

		it('should add the submit class to the element', () => {
			spyOn(form.$el, 'addClass');
			form.options = {
				classSubmitted: 'test'
			};
			form.addSubmitClass();
			expect(form.$el.addClass).toHaveBeenCalledWith('test');
		});
	});

	describe('addEvents specs', () => {
		var form;

		beforeEach(() => {
			form = Object.create(bsp_form);
			form.$el = $('<div></div>');
		});

		it('should call expected functions', () => {
			spyOn(form, 'addSubmitEvents');
			spyOn(form, 'addInputEvents');
			spyOn(form, 'addResetEvents');
			form.addEvents();
			expect(form.addSubmitEvents).toHaveBeenCalled();
			expect(form.addInputEvents).toHaveBeenCalled();
			expect(form.addResetEvents).toHaveBeenCalled();
		});
	});

	describe('addInputEvents specs', () => {
		var form;

		beforeEach(() => {
			form = Object.create(bsp_form);
			form.$el = $('<div></div>');
		});

		it('should pass the expected arguments to the input event', () => {
			form.options = {
				selectorAllFields: 'test'
			};
			spyOn(form.$el, 'on');
			form.addInputEvents();
			expect(form.$el.on).toHaveBeenCalledWith('input', 'test', jasmine.any(Function));
		});

		it('should create a callback on the input event that calls the expected functions', () => {
			var callback;
			var fakeEvent = {
				target: { 'test': 'test' }
			};
			form.events = {
				eventNameInput: 'test'
			};
			form.options = {
				selectorAllFields: 'test'
			};
			spyOn(form, 'makeFormDirty');
			spyOn(form, 'makeFieldDirty');
			spyOn(form.$el, 'on').and.callFake((event, selector, cb) => {
				callback = cb;
			});
			spyOn($.fn, 'init').and.callThrough();
			spyOn($.fn, 'trigger');
			form.addInputEvents();
			callback(fakeEvent);
			expect(form.makeFieldDirty).toHaveBeenCalledWith(fakeEvent.target);
			expect(form.makeFormDirty).toHaveBeenCalled();
			//expect($.fn.init).toHaveBeenCalledWith(fakeEvent.target);
			//expect($.fn.trigger).toHaveBeenCalledWith('test', jasmine.any(Object));
		});
	});

});