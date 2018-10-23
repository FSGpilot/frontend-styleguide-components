var child_process = require('child_process');
var gulp = require('gulp');
var gutil = require('gulp-util');
var dutil = require('./doc-util');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var eslint = require('gulp-eslint');
var es = require('event-stream');
var task = 'javascript';

gulp.task(task, function (done) {

  dutil.logMessage(task, 'Compiling JavaScript');
  
  var files = [
      'dkwds.js',
      'dkwds-vendor-examples.js'
  ];

  //Create a bundle for each starting file in the list above. 
  var tasks = files.map(function(entry) {
    return browserify({ 
          entries: ['src/js/'+ entry],
          debug: true //adds sourcemaps at the end of file.
        })
        .ignore('moment') //we use pikaday.js (without moment.js), tell browserify not to look for momentjs. //https://github.com/dbushell/Pikaday#commonjs-module-support
        .transform('babelify', {
          global: true,
          presets: ['es2015'],
        })
        .bundle()
        .pipe(source(entry))
        .pipe(buffer())
        //.pipe(rename({ basename: dutil.pkg.name }))
        .pipe(gulp.dest('dist/js'))
        //.pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(uglify())
        .on('error', gutil.log)
        .pipe(rename({
          suffix: '.min',
        }))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
  });
  // create a merged stream
  return es.merge.apply(null, tasks);
});

gulp.task('typecheck', function () {
  return new Promise((resolve, reject) => {
    child_process.spawn(
      './node_modules/.bin/tsc',
      { stdio: 'inherit' }
    )
    .on('error', reject)
    .on('exit', code => {
      if (code === 0) {
        dutil.logMessage('typecheck', 'TypeScript likes our code!');
        resolve();
      } else {
        reject(new Error('TypeScript failed, see output for details!'));
      }
     });
  });
});

gulp.task('eslint', function (done) {

  return gulp.src([
      'src/js/**/*.js',
      'spec/**/*.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
