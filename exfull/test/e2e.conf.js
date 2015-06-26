exports.config = {
    baseUrl : 'http://localhost:9999',
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 3,
        chromeOptions: {
            // Get rid of --ignore-certificate yellow warning
            args: ['--no-sandbox', '--test-type=browser'],
            // Set download path and avoid prompting for download even though
            // this is already the default on Chrome but for completeness
            prefs: {
                'download': {
                    default_directory: '/tmp/', // mac
                    prompt_for_download: false, //3 settings below prevents from opening save file dialog window on windows
//                    default_directory: 'd:/', // windows absolute path to save downloaded files
                    default_content_settings: {
                        popups: 0
                    }
                }
            }
        }
    },
    specs: ['e2e/**/!(*Export).spec.js'],
    suites: {
//        export: ['e2e/**/*Export.spec.js'],
        live: ['e2e/**/!(*login|*Export).spec.js'],
        test: ['e2e/**/!(*Export).spec.js'],
        all: ['e2e/**/**.spec.js']
    },
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 100000,
        isVerbose: true,
        includeStackTrace: true
    },
    params: {
        login: {
            user: 'AtsTes1',
            password: 'kr0n0sDev123',
            fullName: 'ATS Testuser1',
            groupName: 'Modernisation Developers'
        }
    },
    onPrepare: function () {
//        browser.driver.manage().window().maximize();
        browser.driver.manage().window().setSize(1400, 900);

        // is it a right place to do it ?
        by.addLocator('placeholder', function (placeholderText, opt_parentElement) {
            var using = opt_parentElement || document,
                placeholders = using.querySelectorAll('input:not([disabled])');

            return Array.prototype.filter.call(placeholders, function (input) {
                return input.getAttribute('placeholder') == placeholderText;
            });
        });

        // Redirect logs from the browser console output to our console
        browser.manage().logs().get('browser').then(function (browserLog) {
            console.log('log: ' + require('util').inspect(browserLog));
        });

    },
    allScriptsTimeout: 100000
};