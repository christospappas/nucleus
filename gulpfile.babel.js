import gulp from 'gulp';
import del from 'del';
import gulpLoadPlugins from 'gulp-load-plugins';
import pkg from './package.json';
import qunit from 'node-qunit-phantomjs'
const $ = gulpLoadPlugins();

gulp.task('scripts', ['clean'], () => {
  return gulp.src('src/**/*.js')
        .pipe($.sourcemaps.init())
        .pipe($.babel({modules: 'ignore'}))
        .pipe($.concat('nucleus.js'))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist'));
});

gulp.task('test', function () {
  qunit('./test/test-runner.html');
});

gulp.task( 'watch', () => {
  gulp.watch( ['./src/**/*.js', './test/**/*_test.js'], ['scripts', 'test'] );
});

gulp.task('clean', () => del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}));

gulp.task('default', ['scripts']);