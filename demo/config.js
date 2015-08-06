System.config({
  defaultJSExtensions: true,
  map: {
  	'babel': '/assets/node/babel-core/browser.js',
  	'bsp-form': '/assets/js/bsp-form.js',
    'bsp-form-constraint-base': '/assets/js/constraints/bsp-form-constraint-base.js',
  	'bsp-form-constraint-matches': '/assets/js/constraints/bsp-form-constraint-matches.js',
    'bsp-form-field': '/assets/js/fields/bsp-form-field.js',
    'bsp-form-field-date': '/assets/js/fields/bsp-form-field-date.js',
  	'bsp-form-message': '/assets/js/bsp-form-message.js',
  	'bsp-utils': '/assets/bower/bsp-utils/bsp-utils.js',
    'bsp-useragent': '/assets/bower/bsp-useragent/src/js/bsp-useragent.js',
  	'jquery': '/assets/bower/jquery/dist/jquery.js',
    'datetimepicker': '/assets/bower/datetimepicker/jquery.datetimepicker.js'
  },
  transpiler: 'babel'
});