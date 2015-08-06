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
    'bsp-feature-detect': '/assets/bower/bsp-feature-detect/src/js/bsp-feature-detect.js',
  	'jquery': '/assets/bower/jquery/dist/jquery.js',
    'jquery.datetimepicker': '/assets/bower/datetimepicker/jquery.datetimepicker.js'
  },
  transpiler: 'babel'
});