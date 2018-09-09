const gulp = require('gulp');
const minify = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
// const uglify = require('gulp-uglify');
// const babel = require('gulp-babel');
const autoprifixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');

gulp.task('css', () => {
    return gulp.src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprifixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(minify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('js', cb => {
    gulp.src(['src/**/*.js'])
    // .pipe(sourcemaps.init())
    // .pipe(babel({
    //     presets: ['@babel/env']
    // }))
    // .pipe(uglify())
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
});

gulp.task('html', () => {
	return gulp.src('src/**/*.html')
	.pipe(gulp.dest('dist'))
});

gulp.task('images', () => {
	return gulp.src(['src/img/*.jpg'])
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
});

gulp.task('manifest', () => {
	return gulp.src(['src/manifest/*'])
	.pipe(gulp.dest('dist/manifest'))
});

gulp.task('watch', () => {
    gulp.watch(['src/*.html', 'src/**/*.js', 'src/css/*.css', 'src/reviews.webmanifest'], () => {
        return gulp
    });
})

gulp.task('default', ['js', 'css', 'html', 'manifest', 'images', 'watch']);