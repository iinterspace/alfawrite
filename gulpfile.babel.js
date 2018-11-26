'use strict';

import gulp from 'gulp'
import grid from 'smart-grid'
import notify from 'gulp-notify'
import watch from 'gulp-watch'
import browserSync from 'browser-sync'
import less from 'gulp-less'
import pug from 'gulp-pug'
import autoprefixer from 'gulp-autoprefixer';
import cssmin from 'gulp-cssmin';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import uglify from 'gulp-uglify';
import jsConcat from 'gulp-concat';
import versionAppend from 'gulp-version-append';
var del = require('del');

const dirSep = require('path').sep;
const settings = {
    outputStyle: 'less',
    columns: 12,
    offset: '30px',
    mobileFirst: false,
    container: {
        maxWidth: '1170px',
        fields: '30px'
    },
    breakPoints: {
        lg: {
            width: '1200px'
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            fields: '15px'
        },
        xs: {
            width: '560px'
        }
    }
};
const jsScripts = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-mousewheel/jquery.mousewheel.js',
    'bower_components/owl.carousel/dist/owl.carousel.js',
    'bower_components/jquery-numerator/jquery-numerator.js',
    'bower_components/romenko.screenscroll/dist/screenScroll.js',
    'js/main.js'
];

gulp.task('init', () => {
    grid('less', settings)
});

gulp.task('styles', () => {
    return gulp.src('less/*.less')
        .pipe(less())
        .on("error", notify.onError({
            message: 'LESS compile error: <%= error.message %>'
        }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('views', () => {
    return gulp.src('*.pug')
        .pipe(pug()).pipe(gulp.dest('')).pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', () => {
    del(['js/app.js']);

    return gulp.src(jsScripts)
        .pipe(jsConcat('app.js'))
        .pipe(gulp.dest('js')).pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch', ['browser-sync'], () => {
    gulp.watch('less/*.less', ['styles']);
    gulp.watch('*.pug', ['views']);
    gulp.watch('js/*.js', ['scripts']);
});

gulp.task('buildCss', () => {
    gulp.src('less/*.less')
        .pipe(less())
        .on("error", notify.onError({
            message: 'LESS compile error: <%= error.message %>'
        })).pipe(gulp.dest('css'));

    return gulp.src('css/style.css')
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('build/css'));
});

gulp.task('buildJs', () => {
    del(['js/app.js']);

    gulp.src(jsScripts)
        .pipe(jsConcat('app.js'))
        .pipe(gulp.dest('js'));

    gulp.src('js/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

gulp.task('buildFonts', () => {
    return gulp.src('fonts/**/*').pipe(rename(function(path){
        var dirs = path.dirname.split(dirSep);
        dirs.splice(1, 1);
        path.dirname = dirs.join(dirSep)
    })).pipe(gulp.dest('build/fonts'));
});

gulp.task('buildImages', () => {
    /*return gulp.src('images/!**!/!*').pipe(rename(function(path){
        var dirs = path.dirname.split(dirSep);
        dirs.splice(1, 1);
        path.dirname = dirs.join(dirSep)
    })).pipe(gulp.dest('build/images'));*/
    return gulp.src('images/**/*').pipe(gulp.dest('build/images'));
});

gulp.task('buildClean', ()=> {
    //return gulp.src('build').pipe(clean());
    return del(['build']);
});

gulp.task('buildHtml', () => {
    gulp.src('*.pug')
        .pipe(pug({})).pipe(gulp.dest(''));

    gulp.src([
        'index.html', 'about.html', 'uslugi.html',
        'portfolio.html', 'contacts.html'
    ]).pipe(versionAppend(['html', 'js', 'css'])).pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('build', [
    'buildClean', 'buildHtml', 'buildCss',
    'buildJs', 'buildFonts', 'buildImages'
]);

