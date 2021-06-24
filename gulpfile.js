const path = require('path');
const { src, dest, series, parallel } = require('gulp');
const sass = require('gulp-dart-sass');
const yaml = require('gulp-yaml');
const del = require('del');
const rename = require('gulp-rename');

const SRC = path.resolve(__dirname, './src');
const DIST = path.resolve(__dirname, './dist');

const _clean = () => del(DIST);
const _copy = ext => src(`${SRC}/**/*.${ext}`).pipe(dest(DIST));
const _assets = () =>
  src(`${SRC}/assets/**/*`).pipe(dest(path.resolve(__dirname, './dist/assets')));
const _wxml = () => _copy('wxml');
const _wxs = () => _copy('wxs');
const _js = () => _copy('js');
const _json = () => _copy('json');
const _sass = () =>
  src(`${SRC}/**/*.scss`)
    .pipe(sass())
    .pipe(rename({ extname: '.wxss' }))
    .pipe(dest(DIST));
const _yaml = () =>
  src(`${SRC}/**/*.yaml`)
    .pipe(yaml({ schema: 'DEFAULT_SAFE_SCHEMA' }))
    .pipe(dest(DIST));

const compile = series(_clean, parallel(_wxml, _wxs, _js, _json, _assets, _sass, _yaml));

const watch = series(
  // _clean,
  // parallel(_wxml, _wxs, _js, _json, _assets, _sass, _yaml),
  () => {
    // watch(`${SRC}/**/*.wxml`, _wxml);
    // watch(`${SRC}/**/*.wxs`, _wxs);
    // watch(`${SRC}/**/*.json`, _json);
    watch(`${SRC}/**/*.scss`, _sass);
    watch(`${SRC}/**/*.yaml`, _yaml);
  }
);

// TODO
const build = () => {};

module.exports = { compile, watch };
