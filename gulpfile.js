'use strict'

var gulp = require('gulp'),
	ts = require('gulp-typescript'),
	less = require('gulp-less'),
	watch = require('gulp-watch'),
	path = require('path'),
	clean = require('gulp-clean'),
	inject = require('gulp-inject'),
	series = require('stream-series'),
	yargs = require('yargs'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename')
	;

var ORIG_CSS = "css";
var ORIG_SCRIPTS = "scripts";
var DEST = "build";

gulp.task("ts", function () {
	var tsRes = gulp.src(ORIG_SCRIPTS + "/**/*.ts")
		.pipe(ts({
			noImplicitAny: true
		}));
	return tsRes.js
		.pipe(gulp.dest(ORIG_SCRIPTS))
		.pipe(gulp.dest(DEST + "/scripts"));
});

gulp.task("css", function () {
	return gulp.src(ORIG_CSS + "/**/*.less")
		.pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulp.dest(ORIG_CSS))
		.pipe(gulp.dest(DEST + "/css"));
});

gulp.task('minify', function () {
    return gulp.src([ORIG_CSS + '/**/*.css', '!' + ORIG_CSS + '/**/*.min.css'])
		.pipe(rename({ extname: '.min.css' }))
		.pipe(minifyCSS())
		.pipe(gulp.dest(ORIG_CSS))
		.pipe(gulp.dest(DEST + "/css"));
});

gulp.task("uglify", function () {
	return gulp.src([ORIG_SCRIPTS + '/**/*.js', '!' + ORIG_SCRIPTS + '/**/*.min.js'])
        .pipe(rename({ extname: '.min.js' }))
        .pipe(uglify())
        .pipe(gulp.dest(ORIG_SCRIPTS))
        .pipe(gulp.dest(DEST + '/scripts'));
});

gulp.task("clean", function () {
    return gulp.src([
		ORIG_CSS + '/**/*.css',
		ORIG_SCRIPTS + '/**/*.js',
		DEST + '/**/*.*'
	], { read: false })
        .pipe(clean());
});


gulp.task("inject", function () {
	var argv = yargs.argv;

	var dev = argv.dev || argv.d

	var css = dev ?
		[ORIG_CSS + "/**/*.css", "!" + ORIG_CSS + "/**/*.min.css"] :
		[ORIG_CSS + "/**/*.min.css"];
	var js = dev ?
		[ORIG_SCRIPTS + "/**/*.js", "!" + ORIG_SCRIPTS + "/**/*.min.js"] :
		[ORIG_SCRIPTS + "/**/*.min.js"];

	var cssStream = gulp.src(css, { read: false });
	var jsStream = gulp.src(js, { read: false });

	return gulp.src("index.html")
		.pipe(inject(series(cssStream, jsStream),
			{
				relative: true
			}))
		.pipe(gulp.dest("./"))
		.pipe(gulp.dest(DEST));
});

gulp.task("dev", function () {
	gulp.watch(ORIG_SCRIPTS + '/**/*.ts', ['transpile']);
    gulp.watch(ORIG_CSS + '/**/*.less', ['css']);
});

gulp.task("default", ["clean", "ts", "css", "uglify", "minify", "inject"]);

