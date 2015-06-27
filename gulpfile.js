var gulp = require('gulp'),
	less = require('gulp-less'),
	browserify = require('gulp-browserify'),
	rename = require('gulp-rename'),
	watch = require('gulp-watch');

gulp.task('less', function () {
	return gulp.src('./public/less/main.less')
		.pipe(less({
			paths: ['./public/less', __dirname]
		}))
		.pipe(rename('style.css'))
		.pipe(gulp.dest('./public/css/'));
});
gulp.task('browserify', function () {
	return gulp.src('./public/js/client_side.js')
		.pipe(browserify({
			insertGlobals: true
		}))
		.pipe(rename('bundle.js'))
		.pipe(gulp.dest('./public/js/'));
});
gulp.task('default', ['less', 'browserify']);
gulp.task('watch', function () {
	gulp.watch('./public/js/*.js', ['browserify']);
	gulp.watch('./public/less/*.less', ['less']);
});
