'use strict'

const gulp = require('gulp')
const path = require('path')
const $    = require('gulp-load-plugins')()
const browserSync = require('browser-sync').create()

const paths = { src: {}, dest: {} }
paths.src.base = './'
paths.src.stylesheets = './resources/stylesheets/main.sass'
paths.src.images = './resources/images/'

paths.dest.stylesheets = './assets/stylesheets/'
paths.dest.images = './assets/images/'


gulp.task('sass', () => {
  gulp
    .src(paths.src.stylesheets)
    .pipe($.sass()).on('error', (err) => { console.error('Error!', err.message) })
    .pipe($.autoprefixer()).on('error', (err) => { console.error('Error!', err.message) })
    .pipe(gulp.dest(paths.dest.stylesheets))
    .pipe(browserSync.stream())
})

gulp.task('images', () => {
  gulp
    .src(path.join(paths.src.images, '*'))
    .pipe($.imagemin({progressive: true}))
    .pipe(gulp.dest(paths.dest.images))
})

gulp.task('watch', () => {
  gulp.watch(paths.src.stylesheets, ['sass'])
  gulp.watch(path.join(paths.src.base, '**/*.html')).on('change', browserSync.reload)
})

gulp.task('serve', ['sass', 'images', 'watch'], () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
})
