let gulp = require('gulp');

let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let minifyCss = require('gulp-minify-css');
let rename = require('gulp-rename');

let browserify = require('browserify');
let babelify = require('babelify');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let uglify = require('gulp-uglify');

gulp.task('sass', function () {
  gulp.src('src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(minifyCss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./dist/css/'))
});

gulp.task('js', function () {
  return browserify({entries: './src/js/main.js', debug: true})
    .transform("babelify", {presets: ["es2015"]})
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('default', ['sass', 'js']);
