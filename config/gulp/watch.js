var gulp = require('gulp');

// Watching for changes
gulp.task('watch', function () {
    gulp.watch(["src/stylesheets/**/*.scss", '!src/stylesheets/lib/**/*.scss'],['sass']);
    gulp.watch("src/js/**/*.js",['javascript']);
});