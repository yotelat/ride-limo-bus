var gulp         = require('gulp');
var path         = require('path');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var open         = require('gulp-open');
var connect      = require('gulp-connect');

var Paths = {
  HERE                 : './',
  DIST                 : 'dist/',
  CSS                  : './assets/css/',
  SCSS_TOOLKIT_SOURCES : './assets/scss/material-kit.scss',
  SCSS                 : './assets/scss/**/**',
  HTML_SOURCES         :['**/*.html']
};

gulp.task('compile-scss', function () {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
});

gulp.task('watch', function () {
  gulp.watch(Paths.SCSS, ['compile-scss']);
});

gulp.task('open', function(){
  gulp.src('./index.html')
  .pipe(open());
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
	port: 9011,
    livereload: true
  })
});

gulp.task('html', function() {
  gulp.src(Paths.HTML_SOURCES)
  .pipe(connect.reload())
});

gulp.task('open-app', ['open', 'watch']);

gulp.task('default', ['connect', 'html', 'watch']);
