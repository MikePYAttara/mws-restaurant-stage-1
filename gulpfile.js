let gulp = require('gulp');
let minify = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
let uglify = require('gulp-uglify');
let autoprifixer = require('gulp-autoprefixer');
let imagemin = require('imagemin');

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

gulp.task('js', () => {
    return gulp.src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
});

gulp.task('html', () => {
	return gulp.src('src/**/*.html')
	.pipe(gulp.dest('dist'))
});

gulp.task('images', () => {
	return gulp.src("src/img/**/*.{'jpg','jpeg','png','svg'}")
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'))
});

gulp.task('manifest', () => {
	return gulp.src('manifest/*')
	.pipe(gulp.dest('dist/manifest'))
});

gulp.task('sw', () => {
	return gulp.src('sw.js')
	.pipe(gulp.dest('dist'))
});


gulp.task('default', ['js', 'css', 'html', 'sw', 'manifest', 'images']);