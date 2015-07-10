bsp-form
========

Introduction
------------

Provides utlities and plugins to build an alternate, highly flexible user interface for HTML forms inside [Brightspot CMS](https://github.com/perfectsense/brightspot-cms).
*	Replaces the native form validation user interface, but still uses native [HTML5 constraint validation](http://www.html5rocks.com/en/tutorials/forms/constraintvalidation/) to validate fields
*	Can revert to native UI if needed
*	Can use native browser validation messages or custom messages
*	Adds helper classes on the form and field elements to aid styling
*	Allows outputting field messages anywhere on the page
*	Custom field constraints can be written with very little code and shared among multiple projects.

Install
-------
`bower install --save perfectsense/brightspot-js-form`

Then load modules into your project as seen in [Brightspot Base](https://github.com/perfectsense/brightspot-base).

Usage
-----
Add a `data-bsp-form` attribute to a form element. 

Add a `data-bsp-form-message="#myfield"` attribute to any element to display validation messages from the selected field inside that element.

All native field contraints are supported, and you can also use custom contraints. Custom contraints are added to a field with a data attribute.

### Custom Classes

bsp-form adds several classes to the form and its fields. These classes can be combined with native [:valid](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Avalid), [:invalid](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Ainvalid), and [:required](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Arequired) pseudo selectors to conditionally display formatting/messages.
*	**clean/dirty** - When the form is clean, no fields have been edited. If a single field has been edited, the field and the form lose the clean class and gain the dirty class. Other fields will keep the clean class until a edited.
*	**submitted** - Added to the form element after submitting the form, removed if the form is reset.

### Validation Messages

You can output the form validation message from a specific field into any element on the page using the `data-bsp-form-message` attribute. This example displays the validation messages from a field with the id "myfield":

	<div data-bsp-form-message="#myfield"></div>

@todo: document options

### Custom Field Constraints

Custom field contraints are added to a field with a data attribute like this:

	<label>My field <input type="text" name="myfield" id="myfield" title="My field" required bsp-form-constraint-myfield /></label>

Then you can extend the base constraint object to create a new constraint. 

Custom contraints are not evaluated until all native contraints on a field pass. In the above example, the custom contraint would not run if the user had not entered any text yet because of the "required" attribute.

See: [a simple synchronous example](demo/demo-form-constraint-example.js), [a simple asynchronous example](demo/demo-form-constraint-async-example.js), and [a more complex reusable field](src/js/constraints/bsp-form-constraint-matches.js).

@todo document options
@todo document object properties/methods

Demo
----

You have to run through http, so an express server is provided. 

Run `node demo/server.js` from the project root.

Visit http://localhost:3000 in a browser.