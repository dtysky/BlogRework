'use strict';

var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

var webpackDistConfig = require('./webpack.dist.config.js'),
    webpackDevConfig = require('./webpack.config.js'),
    webpackServerConfig = require('./webpack.server.config.js');


module.exports = function (grunt) {
    // Let *load-grunt-tasks* require everything
    require('load-grunt-tasks')(grunt);

    // Read configuration from package.json
    var pkgConfig = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkgConfig,

        webpack: {
            dist: webpackDistConfig,
            server: webpackServerConfig
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
                            '<%= pkg.src %>/index_public.html'
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
            },
            server: {
                files: [
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.dist %>/tmp/server.js'],
                        dest: '<%= pkg.dist %>/',
                        filter: 'isFile'
                    },
                    {
                        flatten: true,
                        expand: true,
                        src: ['<%= pkg.src %>/table.json'],
                        dest: '<%= pkg.dist %>/'
                    },
                    {
                        expand: true,
                        cwd: "<%= pkg.src %>/templates",
                        src: '*.jade',
                        dest: '<%= pkg.dist %>/templates/'
                    }
                ]
            }
        },

        rename: {
            main:{
                files: [
                    {
                        src: ['<%= pkg.dist %>/index_public.html'],
                        dest: '<%= pkg.dist %>/base.html'
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
            },
            server: {
                files: [{
                    dot: true,
                    src: [
                        '<%= pkg.dist %>/tmp'
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
                "src/config.js": function(fs, fd, done) {
                    var data = "module.exports =\n" +
                        fs.readFileSync("./config.json") +
                        ";";
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

    grunt.registerTask('client-build', ["file-creator", 'clean:dist', 'webpack:dist', 'copy:dist', 'rename', 'compress', 'copy:compress', 'clean:compress']);

    grunt.registerTask('server-build', ["file-creator", "webpack:server", 'copy:server', 'clean:server']);

    grunt.registerTask('build', ['client-build', 'server-build']);

    grunt.registerTask('default', []);
};
