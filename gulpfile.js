var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var rename = require('gulp-rename');

var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

gulp.task('js', function() {
  return gulp.src(['./src/autoload_css.js', './src/prettify.js', './src/lang-css.js', './src/lang-go.js', './src/lang-lisp.js', './src/lang-sql.js', './src/lang-dos.js'])
    .pipe(concat('prettify.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/'));
});

gulp.task('css', function () {
  return sass('./styles/bootstrap-prettify.scss', {
    style: 'compressed'
    })
    .on('error', sass.logError)
    .pipe(rename('prettify.min.css'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('default', ['js', 'css']);
