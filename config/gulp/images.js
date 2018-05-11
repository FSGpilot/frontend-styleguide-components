var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var svgmin = require('gulp-svgmin');
var rename = require('gulp-rename');
var path =  require('path');
var dutil = require('./doc-util');
var task = 'images';

gulp.task(task, function (done) {

  dutil.logMessage(task, 'Copying Images');

  var stream = gulp.src(['src/img/**/*'])
    .pipe(gulp.dest('dist/img'));

  return stream;

});

/**
 * Generate a SVG file that contains all svg's from the "/src/img"-folder.
 */
gulp.task('svg', function(){
  dutil.logMessage(task, 'Compiling svg icons');

  return gulp
    .src('src/img/svg-icons/**/*.svg')
    .pipe(svgmin(function (file) {
        var prefix = path.basename(file.relative, path.extname(file.relative));
        return {
            plugins: [{
                cleanupIDs: {
                    prefix: prefix + '-',
                    minify: true
                }
            }]
        }
    }))
    .pipe(svgstore())
    .pipe(rename({ prefix: 'all-' })) //name="all-svg-icons"
    .pipe(gulp.dest('src/img'))
    .pipe(gulp.dest('dist/img'));
});