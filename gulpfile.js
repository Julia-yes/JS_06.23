var autoprefixer = require('autoprefixer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');


function buildStyles() {
    return gulp.src('src/styles/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/'));
};

function watch() {
    gulp.watch(['src/styles/**/*.scss'], function(cb) {
        buildStyles();
        cb();
    });
};

exports.watch = watch;