// Generated on 2014-01-22 using generator-backular 0.0.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var LIVERELOAD_PORT = 35729;
    var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };
    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {
    }

    grunt.initConfig({
        yeoman: yeomanConfig,
        bower: {
            install: {
                options: {
                    targetDir: 'bower',
                    copy: false,
                    install: true,
                    verbose: true
                }
            }
        },
        watch: {
            styles: {
                files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            karma: {
                files: [
                    '<%= yeoman.app %>/models/{,*/}*.js',
                    '<%= yeoman.app %>/widgets/**/{,*/}*.js',
                    'test/**/*Spec.js',
                    'test/e2e/*.js'
                ],
                tasks: ['karma:unitAuto:run', 'karma:middleAuto:run', 'karma:e2eAuto:run']
            },
            ngTemplates: {
                files: ['<%= yeoman.app %>/widgets/**/*.html'],
                tasks: ['ngtemplates', 'karma:middleAuto:run', 'karma:e2eAuto:run']
            },
            less: {
                files: ['<%= yeoman.app %>/styles/*.less'],
                tasks: ['less:development']
            },
            livereload: {
                options: {
                    livereload: LIVERELOAD_PORT
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/models/{,*/}*.js',
                    '<%= yeoman.app %>/widgets/**/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '.tmp/scripts/templates.js'
                ]
            }
        },
        ngtemplates: {
            jsWars: {
                src: '<%= yeoman.app %>/widgets/**/*.html',
                dest: '.tmp/scripts/templates.js',
                options: {
                    url: function (url) {
                        return url.replace(/(app\/widgets\/([\s\S]*?)\/)/, '').replace(/.html/, '');
                    }
                }
            }
        },
        less: {
            development: {
                opions: {
                    paths: ['<%= yeoman.app %>/styles']
                },
                files: {
                    '.tmp/styles/main.css': '<%= yeoman.app %>/styles/game.less'
                }
            }
        },
        autoprefixer: {
            options: ['last 1 version'],
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/models/{,*/}*.js',
                '<%= yeoman.app %>/widgets/**/{,*/}*.js'
            ]
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: ['*.html', 'views/*.html'],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '**/*.js',
                            '**/*.html',
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'bower_components/**/*',
                            'images/{,*/}*.{gif,webp,png,jpg}',
                            'styles/fonts/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= yeoman.dist %>/images',
                        src: [
                            'generated/*'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/scripts',
                        dest: '<%= yeoman.dist %>/scripts',
                        src: [
                            '*.js'
                        ]
                    },
                    {
                        expand: true,
                        cwd: '.tmp/styles',
                        dest: '<%= yeoman.dist %>/styles',
                        src: [
                            '*.css'
                        ]
                    }
                ]
            },
            images: {
                expand: true,
                cwd: '<%= yeoman.app %>/images',
                dest: '.tmp/images/',
                src: '{,*/}*.{gif,webp,png,jpg}'
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            templates: {
                expand: true,
                cdw: '.tmp/scripts/',
                src: '{,*/}*.js'
            }
        },
        concurrent: {
            server: [
                'copy:styles',
                'copy:images'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            unitAuto: {
                configFile: 'karma.conf.js',
                background: true
            },
            middle: {
                configFile: 'middle-karma.conf.js',
                singleRun: true
            },
            middleAuto: {
                configFile: 'middle-karma.conf.js',
                background: true
            },
            e2e: {
                configFile: 'e2e-karma.conf.js',
                singleRun: true
            },
            e2eAuto: {
                configFile: 'e2e-karma.conf.js',
                background: true
            }
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        ngmin: {
            dist: {
//                files: [
//                    {
//                        expand: true,
//                        cwd: '<%= yeoman.dist %>/scripts',
//                        src: '*.js',
//                        dest: '<%= yeoman.dist %>/scripts'
//                    }
//                ]
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/*.js',
                        '<%= yeoman.dist %>/widgets/**/*.js',
                        '<%= yeoman.dist %>/models/*.js',
                        '<%= yeoman.dist %>/models/**/*.js'
                    ]
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/*.js',
                        '<%= yeoman.dist %>/widgets/*.js',
                        '<%= yeoman.dist %>/models/*.js'
                    ]
                }
            }
        },
        'string-replace': {
            inline: {
                files: {
                    '<%= yeoman.dist %>/index.html': '<%= yeoman.dist %>/index.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: '<!--start PROD imports',
                            replacement: '<!--start PROD imports-->'
                        },
                        {
                            pattern: 'end PROD imports-->',
                            replacement: '<!--end PROD imports-->'
                        },
                        {
                            pattern: '<!--start DEV imports-->',
                            replacement: '<!--start DEV imports'
                        },
                        {
                            pattern: '<!--end DEV imports-->',
                            replacement: 'end DEV imports-->'
                        }
                    ]
                }
            }
        }
    });

    grunt.registerTask('install', [
        'install-dependencies',
        'bower:install'
    ]);

    grunt.registerTask('heroku:production', ['install', 'build']);

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'ngtemplates',
            'less:development',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'open',
            'karma:unitAuto',
            'karma:middleAuto',
            'karma:e2eAuto',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'ngtemplates',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'jshint',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'ngtemplates',
        'less',
        'string-replace',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'copy:dist',
        'cdnify',
        'ngmin',
//        'uglify',
        'rev',
        'string-replace',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'install',
        'build',
        'jshint',
        'test'
    ]);
};
