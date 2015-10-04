module.exports = function(grunt) {

  grunt.initConfig({
    rs: grunt.file.readJSON('.rs.json'),
    uglify: {
      production: {
        files: {
          'web/js/script.min.js': [
            'web/vendor/jquery/dist/jquery.min.js',
            'web/vendor/vegas/dist/vegas.min.js',
            'web/js/script.js'
          ]
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
      },
      target: {
        files: {
          'web/css/style.min.css': [
            'web/vendor/pure/pure-min.css',
            'web/vendor/pure/grids-responsive-min.css',
            'web/vendor/vegas/dist/vegas.min.css',
            'web/css/style.css'
          ],
        }
      }
    },
    cloudfiles: {
      prod: {
        'user': 'inkysplat',
        'key': '<%= rs.APIKey %>',
        'region': 'LON',
        'upload': [{
          'container': 'falloween',
          'src': 'web/**/*',
          'dest': '/',
          'stripcomponents': 1,
          'purge': {
            'emails': ['inkysplat@gmail.com'],
            'files': ['index.html','js/script.min.js','css/style.min.css']
          }
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-cloudfiles');
  grunt.registerTask('default', ['uglify','cssmin']);
  grunt.registerTask('deploy',['cloudfiles']);
};
