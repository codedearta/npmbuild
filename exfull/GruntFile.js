/**
 * grunt build          - clean and deploy development build to public/
 * grunt build-watch    - watch files for changes and rebuild
 * grunt test-unit      - run karma unit tests and generate coverage report
 * grunt test-watch     - run karma unit tests in watch mode
 * grunt test-e2e       - run protractor end to end integration tests
 * grunt clean          - clean all generated files
 * grunt clean:build    - clean build modules only
 * grunt clean:node     - clean npm modules only (remember to run 'npm install' again)
 *
 */
module.exports = function (grunt) {

    'use strict';

    grunt.registerTask('build', ['gitinfo', 'clean:build', 'preprocess', 'copy:workers', 'copy:config', 'less', 'concat', 'uglify']);

    grunt.registerTask('build-watch', ['build', 'watch']);

    grunt.registerTask('test-unit', ['gitinfo', 'clean:test', 'preprocess', 'karma:unit', 'copy:coverageReport']);

    grunt.registerTask('test-e2e', ['build', 'protractor:test']);

    grunt.registerTask('test-watch', ['clean:test', 'karma:watch']);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Compile our LESS sources
        // https://github.com/gruntjs/grunt-contrib-less
        less: {
            client: {
                options: {
                    paths: [ 'client/css', 'public/vendor/bootstrap/less' ],
                    concat: true
                },
                files: {
                    'public/css/app.css': 'client/css/styles.less'
                }
            }
        },

        // Concat our JavaScript client sources
        // https://github.com/gruntjs/grunt-contrib-concat
        concat: {
            // Run this task with the 'grunt concat:client' command.
            client: {
                options: {
                    separator: '\n',
                    banner: "/*! <%= pkg.name %>-<%= pkg.version %> (<%= gitinfo.local.branch.current.SHA %>) */\n'use strict';\n",
                    process: function (src, filepath) {
                        return '\n// Source: ' + filepath + '\n' +
                            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    }
                },
                src: [ 'processed/js/app.js', 'client/js/atsdcf/**/*.js', '!**/*.spec.js', '!**/*.e2e.js', '!client/js/config.js'],
                dest: 'public/js/app.js'
            }
        },

        // Minimise our JavaScript client sources
        // https://github.com/gruntjs/grunt-contrib-uglify
        uglify: {
            // Run this task with the 'grunt uglify:client' command.
            client: {
                options: {
                    banner: '/*! <%= pkg.name %>-<%= pkg.version %> (<%= gitinfo.local.branch.current.SHA %>) */\n',
                    mangle: false
                },
                files: {
                    'public/js/app.min.js': [ '<%= concat.client.dest %>' ]
                }
            }
        },

        // Clean
        // https://github.com/gruntjs/grunt-contrib-clean
        clean: {
            // Run this task with the 'grunt clean:build' command.
            build: {
                src: [
                    'processed',
                    'public/js',
                    'public/css'
                ]
            },
            // Run this task with the 'grunt clean:test' command.
            test: {
                src: [
                    'test/reports',
                    'test/coverage'
                ]
            },
            // Run this task with the 'grunt clean:node' command.
            node: {
                src: [
                    'node_modules',
                    'public/vendor'
                ]
            }
        },

        // Watch the following files and execute the given tasks if they change
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            options: {
                livereload: true
            },
            app: {
                files: ['client/js/app.js'],
                tasks: ['gitinfo', 'preprocess']
            },
            js: {
                files: ['client/**/!(app).js', 'config-*.json'],
                tasks: ['gitinfo', 'preprocess', 'copy:workers', 'concat', 'uglify']
            },
            css: {
                files: ['client/css/**/*.less'],
                tasks: ['less:client']
            },
            html: {
                files: ['client/index.html', 'public/partials/**/*.html']
            }
        },

        // Runs our karma tests
        // https://github.com/karma-runner/grunt-karma
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            },
            watch: {
                configFile: 'test/karma.conf.js',
                singleRun: false
            }
        },

        // https://github.com/gruntjs/grunt-contrib-copy
        copy: {
            workers: {
                cwd: 'client/js/',
                src: 'workers/**/*.worker.js',
                dest: 'public/js/',
                expand: true
            },
            config: {
                cwd: 'client/js/',
                src: 'config.js',
                dest: 'public/js/',
                expand: true
            },
            // Copy coverage report to location sonar can find it
            coverageReport: {
                src: 'test/coverage/**/lcov.info',
                dest: 'test/reports/lcov.info'
            }
        },

        // Protractor
        // https://github.com/teerapap/grunt-protractor-runner
        protractor: {
            options: {
                configFile: 'node_modules/protractor/referenceConf.js',
                keepAlive: false,
                noColor: false
            },
            test: {
                configFile: 'test/e2e.conf.js',
                options: {
                    args: {
                        baseUrl: "http://localhost:63342/atsdcf-ui/public/index.html",
                        suite: 'all'
                    }
                }
            }
        },
        // Environment preprocessing
        // https://github.com/jsoverson/grunt-preprocess
        preprocess: {
            client: {
                files: {
                    'processed/js/app.js': 'client/js/app.js',
                    'public/index.html': 'client/index.html',
                    'public/envConfig/config-ci.js': 'client/js/envConfig/config-ci.js',
                    'public/envConfig/config-dev.js': 'client/js/envConfig/config-dev.js',
                    'public/envConfig/config-patchprod.js': 'client/js/envConfig/config-patchprod.js',
                    'public/envConfig/config-patchuat.js': 'client/js/envConfig/config-patchuat.js',
                    'public/envConfig/config-preprod.js': 'client/js/envConfig/config-preprod.js',
                    'public/envConfig/config-prod.js': 'client/js/envConfig/config-prod.js',
                    'public/envConfig/config-qa.js': 'client/js/envConfig/config-qa.js',
                    'public/envConfig/config-uat.js': 'client/js/envConfig/config-uat.js'
                },
                options: {
                    context: {
                        version: '<%= pkg.version %>',
                        gitVersion: '<%= gitinfo.local.branch.current.SHA %>'
                    }
                }
            }
        },

        // Version bump
        // https://www.npmjs.org/package/grunt-bump
        // We are using bump, to set the version in the package file to the passed in value.
        // On UAT, we run grunt bump --setversion=$version (tag)
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: false,
                createTag: false,
                push: false
            }
        }

    });

    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-gitinfo');
};