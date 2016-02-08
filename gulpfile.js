var elixir = require('laravel-elixir');
var gulp = require('gulp');

var concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');


/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
var path = 'public/app/**/*';
var dest = 'public/assets/';
var srciptPath = path + '.js';
var scriptDest = dest + 'js';
var stylePath = path + '.scss';
var styleDest = dest + 'css';

elixir(function(mix) {
    mix.sass('app.scss');
    mix.task('scripts', srciptPath);
    mix.task('style', stylePath);
});

gulp.task('style', function() {
    return gulp.src(stylePath)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(styleDest));
});

gulp.task('scripts', function() {
    return gulp.src(srciptPath)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(scriptDest));
})
