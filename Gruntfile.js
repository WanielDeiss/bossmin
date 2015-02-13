module.exports = function(grunt) {
	// Project Settings
	var jsFiles = [
		'js/sidebar.js'
	];

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		banner: '/*!\n' +
				' * bossmin v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
				' * Copyright 2015 <%= pkg.author %>\n' +
				' * Licensed under <%= pkg.license %>\n' +
				' */\n',

		clean: {
			dist: 'dist',
			demo: [
				'demo/css',
				'demo/js'
			]
		},

		less: {
			dist: {
				files: {
					'dist/css/<%= pkg.name %>.css': 'less/<%= pkg.name%>.less'
				}
			},
			demo: {
				files: {
					'demo/assets/css/<%= pkg.name %>.css': 'less/<%= pkg.name%>.less'
				}
			}
		},

		cssmin: {
			dist: {
				src: 'dist/css/<%= pkg.name %>.css',
				dest: 'dist/css/<%= pkg.name %>.min.css'
			},
			demo: {
				src: 'demo/assets/css/<%= pkg.name %>.css',
				dest: 'demo/assets/css/<%= pkg.name %>.min.css'
			}
		},

		removelogging: {
			dist: {
				src: 'dist/js/*.js'
			},
			demo: {
				src: 'demo/assets/js/*.js'
			}
		},

		concat: {
			dist: {
				src: jsFiles,
				dest: 'dist/js/<%= pkg.name %>.js'
			},
			demo: {
				src: jsFiles,
				dest: 'demo/assets/js/<%= pkg.name %>.js'
			}
		},

		uglify: {
			dist: {
				files: {
					'dist/js/<%= pkg.name %>.min.js': 'dist/js/<%= pkg.name %>.js'
				}
			},
			demo: {
				files: {
					'demo/assets/js/<%= pkg.name %>.min.js': 'demo/assets/js/<%= pkg.name %>.js'
				}
			}
		},

		usebanner: {
			dist: {
				options: {
					position: 'top',
					banner: '<%= banner %>'
				},
				files: {
					src: [
						'dist/css/<%= pkg.name %>.css',
						'dist/css/<%= pkg.name %>.min.css',
						'dist/js/<%= pkg.name %>.js',
						'dist/js/<%= pkg.name %>.min.js',
						'demo/assets/css/<%= pkg.name%>.css',
						'demo/assets/css/<%= pkg.name%>.min.css',
						'demo/assets/js/<%= pkg.name%>.js',
						'demo/assets/js/<%= pkg.name%>.min.js'
					]
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-banner');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-remove-logging');
	// Default task(s).
	grunt.registerTask('default', [
		'clean',
		'less',
		'cssmin',
		'concat',
		'removelogging',
		'uglify',
		'usebanner'
	]);

};