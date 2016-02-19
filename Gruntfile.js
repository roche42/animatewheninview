module.exports = function(grunt) {

	// CONFIGURATION
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// https://github.com/gruntjs/grunt-contrib-uglify
		uglify: {
			dist: {
				files: {
					'dist/animatewheninview.min.js': ['src/animatewheninview.js']
				}
			}
		},

		// Minify CSS
		// https://github.com/gruntjs/grunt-contrib-cssmin
		cssmin: {
			dist: {
				files: {
					'dist/animatewheninview.min.css': ['src/animatewheninview.css']
				}
			},
		},

		// https://github.com/gruntjs/grunt-contrib-copy
		copy: {
			demo: {
				expand: true,
				flatten: true,
				src: [
					'src/animatewheninview.js',
					'src/animatewheninview.css'
				],
    			dest: 'demo/',
			}
		},

		// http://www.browsersync.io/docs/grunt/
		browserSync: {
			bsFiles: {
				src : [
					'demo/animatewheninview.js',
					'demo/animatewheninview.css',
				]
			},
			options: {
				watchTask: true,
				server: {
					baseDir: "./demo"
				}
			},
		},

		// https://github.com/gruntjs/grunt-contrib-watch
		watch: {
			demo: {
				files: [
					'src/animatewheninview.js',
					'src/animatewheninview.css'
				],
				tasks: ['copy']
			}
        },
	});

	// Load plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-notify'); // https://github.com/dylang/grunt-notify

	// Task to run when doing 'grunt' in terminal.
	grunt.registerTask('default', [
		'uglify',
		'cssmin',
		'copy',
		'browserSync',
		'watch'
	]);
};
