const gulp = require('gulp');
const sass = require('gulp-sass');
const minify = require('gulp-cssnano');

gulp.task('sass', ()=>{
	return gulp.src('src/sass/main.scss')
	.pipe(sass())
	.pipe(minify())
	.pipe(gulp.dest('src/css'))
})

gulp.task('watch', ()=>{
	gulp.watch('src/sass/*.scss', ['sass'])
})