// 引包
var gulp = require('gulp');
var path = require('path');
var url = require('url');
var fs = require('fs');
var sass = require('gulp-sass');
var server = require('gulp-webserver');
var mock = require('./mock/data.json');
// 编译
gulp.task('sass', function () {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css/'));
});
// 起服务
gulp.task('server', function () {
    gulp.src('src')
        .pipe(server({
            host: 'localhost',
            port: 6060,
            open: true,
            middleware: function (req, res, next) {
                if (req.url === '/favicon.ico') {
                    return;
                }
                var pathname = url.parse(req.url, true).pathname;
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                if (pathname === '/api/list') {
                    res.end(JSON.stringify(mock));
                }
            }
        }));
});

gulp.task('change', function () {
    gulp.watch('src/scss/index.scss', ['sass']);
});