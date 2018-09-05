const gulp = require('gulp');
const minify = require('css-minify');

gulp.task('css', () => {
    return gulp.src('./src/css/**/*.css')
            .pipe(minify())
            .pipe(gulp.dest('./build/css'))
});

gulp.task('js', () => {
    return gulp.src()
});

gulp.task('html', () => {

});

gulp.task('images', () => {

});

gulp.task('manifest', () => {

});

gulp.task('sw', () => {

});

gulp.task('clean', () => {

});

gulp.task('build', ['clean', 'js', 'css', 'html', 'sw', 'manifest', 'images'], () => {

});