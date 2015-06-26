// Karma configuration
// Generated on Mon Feb 24 2014 13:43:49 GMT+0000 (GMT Standard Time)

module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',


        // frameworks to use
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'public/vendor/jquery/dist/jquery.min.js',
            'public/vendor/lodash/lodash.min.js',
            'public/vendor/requirejs/require.js',
            'public/vendor/angular/angular.js',
            'public/vendor/angular-mocks/angular-mocks.js',
            'public/vendor/restangular/dist/restangular.js',
            'public/vendor/jquery-ui/ui/minified/jquery-ui.min.js',
            'public/vendor/jasmine-jquery/lib/jasmine-jquery.js',
            'public/vendor/sinonjs/sinon.js',
            'public/vendor/jasmine-sinon/lib/jasmine-sinon.js',
            'public/vendor/angular-strap/dist/angular-strap.min.js',
            'public/vendor/angular-strap/dist/angular-strap.tpl.min.js',
            'public/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'public/vendor/bootstrap-select/js/bootstrap-select.js',
            'public/vendor/angular-bootstrap-select/build/angular-bootstrap-select.min.js',
            'public/vendor/bootstrap/dist/js/bootstrap.min.js',
            'public/vendor/typeahead.js/dist/*.min.js',
            'public/vendor/angular-typeahead/angular-typeahead.min.js',
            'public/vendor/ng-tags-input/ng-tags-input.min.js',
            'public/i18n/angular-locale_en-gb.js',
            'public/js/app.js',
            'public/js/config.js',
            'client/js/**/*.spec.js',
            { pattern: 'public/partials/panels/break-list/list.html', included: false, served: true },
            { pattern: 'public/templates/time-input.tpl.html', included: true, served: true },
            { pattern: 'public/templates/datepicker.html', included: true, served: true },
            { pattern: 'public/templates/period-selector.tpl.html', included: true, served: true },
            { pattern: 'public/templates/atsdcf-pagination.tpl.html', included: true, served: true },
            { pattern: 'client/js/atsdcf/**/*.tpl.html', included: false, served: true }
        ],

        proxies: {
            '/vendor/lodash/lodash.min.js': 'http://localhost:9876/base/public/vendor/lodash/lodash.min.js',
            '/js/workers/sorter.worker.js': 'http://localhost:9876/base/client/js/workers/sorter.worker.js'
        },

        // list of files to exclude
        exclude: [
            'client/js/app.js',
            '**/*.e2e.js'
        ],

        preprocessors: {
            'processed/js/app.js': ['coverage'],
            'client/js/**/!(*.spec).js': ['coverage'],
            'public/partials/panels/break-list/list.html': ['ng-html2js'],
            'public/templates/period-selector.tpl.html': ['ng-html2js'],
            'public/templates/time-input.tpl.html': ['ng-html2js'],
            'public/templates/datepicker.html': ['ng-html2js'],
            'public/templates/campaign-number-input.tpl.html': ['ng-html2js'],
            'public/templates/atsdcf-pagination.tpl.html': ['ng-html2js']
        },

        ngHtml2JsPreprocessor: {
            cacheIdFromPath: function (filePath) {
                var match = filePath.match(/templates\/.*\.html/);
                return match == null ? 'atsdcf' : match;
            },
            stripPrefix: 'public/',
            moduleName: 'atsdcf'
        },


        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'coverage', 'junit'],

        junitReporter: {
            outputFile: 'test/reports/TEST-karma.xml',
            suite: ''
        },

        coverageReporter: {
            type: 'lcov',
            dir: 'test/coverage/'
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],


        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true
    });
};
