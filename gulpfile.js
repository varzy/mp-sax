const path = require('path');
const del = require('del');
const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const yaml = require('gulp-yaml');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');

const isPord = process.env.NODE_ENV === 'production';
const SRC = path.resolve(__dirname, './src');
const DIST = path.resolve(__dirname, './dist');

const _clean = () => del(DIST);
const _copy = ext => gulp.src(`${SRC}/**/*.${ext}`).pipe(gulp.dest(DIST));
const _wxs = () => _copy('wxs');
const _json = () => _copy('json');
const _wxml = () => _copy('wxml');
const _js = () => gulp.src(`${SRC}/**/*.js`).pipe(gulpIf(isPord, uglify())).pipe(gulp.dest(DIST));
const _assets = () =>
  gulp.src(`${SRC}/assets/**/*`).pipe(gulp.dest(path.resolve(__dirname, './dist/assets')));
const _sass = () =>
  gulp
    .src(`${SRC}/**/*.scss`)
    .pipe(sass())
    .pipe(rename({ extname: '.wxss' }))
    .pipe(gulp.dest(DIST));
const _yaml = () =>
  gulp
    .src(`${SRC}/**/*.yaml`)
    .pipe(yaml({ schema: 'DEFAULT_SAFE_SCHEMA' }))
    .pipe(gulp.dest(DIST));

const build = gulp.series(_clean, gulp.parallel(_wxml, _wxs, _js, _json, _assets, _sass, _yaml));

const watch = gulp.series(build, () => {
  gulp.watch(`${SRC}/**/*.wxml`, _wxml);
  gulp.watch(`${SRC}/**/*.wxs`, _wxs);
  gulp.watch(`${SRC}/**/*.js`, _js);
  gulp.watch(`${SRC}/**/*.yaml`, _yaml);
  gulp.watch(`${SRC}/**/*.json`, _json);
  gulp.watch(`${SRC}/**/*.scss`, _sass);
  gulp.watch(`${SRC}/assets/**/*`, _assets);
});

module.exports = { build, watch };
