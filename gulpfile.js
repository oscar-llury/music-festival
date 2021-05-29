var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');
var util = require('gulp-util');
var minifyCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');

var Paths = {
  HERE: './',
  CSS: './css/',
  SCSS_TOOLKIT_SOURCES: './css/scss/styles.scss',
  SCSS: './css/scss/**/**',
  START: './login.html'
};

// commando con --production para prod.
var config = {
  production: !!util.env.production,
  develop: !util.env.production
}

gulp.task('compile-scss', function() {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(gulpif(config.develop, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(config.production ? minifyCSS() : util.noop())
    .pipe(gulpif(config.develop, sourcemaps.write('.')))
    .pipe(gulp.dest(Paths.CSS));
});

gulp.task('watch', function() {
  gulp.watch(Paths.SCSS, gulp.series('compile-scss'));
});

gulp.task('open', function() {
  gulp.src(Paths.START)
    .pipe(open());
});

gulp.task('open-app', gulp.parallel('open', 'watch'));