bsp-form
========

Introduction
------------

Provides utlities and plugins to build an alternate, highly flexible user interface for HTML forms inside [Brightspot CMS](https://github.com/perfectsense/brightspot-cms).
*	Replaces the native form validation user interface, but still uses native [HTML5 constraint validation](http://www.html5rocks.com/en/tutorials/forms/constraintvalidation/) to validate fields
*	Can revert to native UI if needed
*	Adds some helper classes on the form and input elements to aid styling
*	Allows outputting field messages anywhere on the page
*	Can use native browser validation messages or custom messages
*	Custom field constraints can be written with very little code by extending a base class. See: [a simple synchronous example](demo/demo-form-constraint-example.js), [a simple asynchronous example](demo/demo-form-constraint-async-example.js), and [a more complex reusable field](src/js/constraints/bsp-form-constraint-matches.js).

Custom Classes
--------------
These classes can be combined with native [:valid](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Avalid), [:invalid](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Ainvalid), and [:required](https://developer.mozilla.org/en-US/docs/Web/CSS/%3Arequired) pseudo selectors to conditionally display formatting/messages.
*	**clean/dirty** - When the form is clean, no fields have been edited. If a single field has been edited, the field and the form lose the clean class and gain the dirty class. Other fields will keep the clean class until a user edits them.
*	**submitted** - Added to the form element after submitting the form, removed if the form is reset.

Demo
----

You have to run through http, so an express server is provided. 

Run `node demo/server.js` from the project root.

Visit http://localhost:3000 in a browser.