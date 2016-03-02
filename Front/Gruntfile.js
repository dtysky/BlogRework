'use strict';

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.config.js');


module.exports = function (grunt) {
    // Let *load-grunt-tasks* require everything
    require('load-grunt-tasks')(grunt);

    // Read configuration from package.json
    var pkgConfig = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkgConfig,

        webpack: {
            options: webpackDistConfig,
            dist: {
                cache: false
            }
        },

        'webpack-dev-server': {
            options: {
                hot: true,
                port: 8000,
                webpack: webpackDevConfig,
                publicPath: '/assets/',
                contentBase: './<%= pkg.src %>/',
                historyApiFallback: true
            },

            start: {
                keepAlive: true
            }
        },

        connect: {
            options: {
                port: 8000
            },

            dist: {
                options: {
                    keepalive: true,
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, pkgConfig.dist)
                        ];
                    }
                }
            }
        },

        open: {
            options: {
                delay: 500
            },
            dev: {
                path: 'http://localhost:<%= connect.options.port %>/webpack-dev-server/'
            },
            dist: {
                path: 'http://localhost:<%= connect.options.port %>/'
            }
        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= pkg.src %>/theme/image",
                        src: '**/*',
                        dest: '<%= pkg.dist %>/theme/image/'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/theme/font/*'],
                        dest: '<%= pkg.dist %>/theme/font/',
                        filter: 'isFile'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: [
                            '<%= pkg.src %>/index_public.html',
                            '<%= pkg.src %>/config.js'
                        ],
                        dest: '<%= pkg.dist %>/',
                        filter: 'isFile'
                    }
                ]
            },
            compress: {
                files: [
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.dist %>/assets/tmp/*'],
                        dest: '<%= pkg.dist %>/assets/',
                        filter: 'isFile'
                    }
                ]
            }
        },

        rename: {
            main:{
                files: [
                    {
                        src: ['<%= pkg.dist %>/index_public.html'],
                        dest: '<%= pkg.dist %>/index.html'
                    }
                ]
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= pkg.dist %>'
                    ]
                }]
            },
            compress: {
                files: [{
                    dot: true,
                    src: [
                        '<%= pkg.dist %>/assets/tmp'
                    ]
                }]
            }
        },

        compress: {
            main: {
                cwd: '<%= pkg.dist %>/assets/',
                options: {
                    mode: 'gzip'
                },
                expand: true,
                src: [
                    '*.js',
                    '*.css'
                ],
                dest: '<%= pkg.dist %>/assets/tmp'
            }
        },

        "file-creator": {
            "dist": {
                "dist/config.js": function(fs, fd, done) {
                    var data = "(function(){\n    " +
                        "window.config = " +
                        fs.readFileSync("./config.json") + "\n" +
                        "}());";
                    fs.writeSync(fd, data);
                    done();
                }
            }
        }

    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open:dist', 'connect:dist']);
        }

        grunt.task.run([
            'open:dev',
            'webpack-dev-server'
        ]);
    });

    grunt.registerTask('debug', ['webpack-dev-server']);

    grunt.registerTask('build', ['clean:dist', 'webpack:dist', 'copy:dist', 'rename', 'compress', 'copy:compress', 'clean:compress', "file-creator"]);

    grunt.registerTask('default', []);
};
