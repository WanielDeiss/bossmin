module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			development: {
				files: {
					'dist/css/<%= pkg.name %>.css': 'less/<%= pkg.name%>.less'
				}
			}
		},
		cssmin: {
			dist: {
				src: 'dist/css/<%= pkg.name %>.css',
				dest: 'dist/css/<%= pkg.name %>.min.css'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Default task(s).
	grunt.registerTask('default', ['less', 'cssmin']);

};