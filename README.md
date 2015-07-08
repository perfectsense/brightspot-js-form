bsp-form
========

More to follow, but basics are:

*	Uses native [HTML5 constraint validation](http://www.html5rocks.com/en/tutorials/forms/constraintvalidation/) on fields
*	Adds classes to inputs and form element to aid in styling:
	*	clean/dirty - When the form is clean, no fields have been editied. If a single field has been edited, the field and the form lose the clean/valid classes and gain the dirty/invalid classes.
	*	valid/invalid - Toggled on the form and element if a field is invalid. The form and field keep the dirty class even after valid data is entered and restored unless the form is reset.
*	Since the UI for form validation is wildly inconsistent across different browsers, it is bypassed by default and messages can be written to any element using the bsp-form-message plugin. Example: `<div bsp-form-message="#myfield"></div>`. When the form is submitted, the error message for a field with the ID myfield will be taken from the input's title attribute and displayed in the element.
*	It is possible to use the native UI by setting the validateNative option to true.