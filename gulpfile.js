var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber      = require('gulp-plumber'),
    browserSync  = require('browser-sync'),
    del          = require('del'),
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cache        = require('gulp-cache'),
    rigger 		 = require('gulp-rigger'),
    webp         = require('gulp-webp'),
    replace      = require('gulp-replace'),
    image        = require('gulp-image'),
    newer        = require('gulp-newer'),
    cached       = require('gulp-cached'),
    dependents   = require('gulp-dependents'),
    responsive   = require('gulp-responsive'),
    tap          = require('gulp-tap'),
    translate    = require("gulp-translate"),
    rename       = require("gulp-rename");

sass.compiler = require('node-sass');
gulp.task('sass', function () {
    return gulp.src('sass/**/*.scss')
    .pipe(plumber())
    .pipe(cached('scss'))
    .pipe(dependents())
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browser Sync
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('img', function() {
    return gulp.src('img-big/**/*.*') // Берем все изображения из app
        .pipe(newer('img'))
        .pipe(image())
        .pipe(gulp.dest('img', function(file) {
            return file.base
        }))
    .pipe(browserSync.stream({match: '**/*.*'}));
});

gulp.task('watch', gulp.parallel('browser-sync', 'sass', 'img', () => {
    gulp.watch(['sass/**/*.scss'], gulp.series('sass'));
    gulp.watch('img-big/', gulp.series('img'));
    gulp.watch('index.html').on('change', browserSync.reload);
}));
