var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    rename = require('gulp-rename'), // 重命名
    uglify = require('gulp-uglify'), // 去掉空格
    autoprefixer = require('gulp-autoprefixer'), // 自动设置浏览器前缀
    htmlmin = require('gulp-htmlmin'), // 优化 html
    cleanCss = require('gulp-clean-css'), // 优化 css
    notify = require('gulp-notify'), // 通知
    imagemin = require('gulp-imagemin'), // 优化 images
    concat = require('gulp-concat'); // 合并

// 默认任务
gulp.task('default', ["help"]);

// 启动 测试server
gulp.task("server", function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// 启动构建
gulp.task('build', ["html", "js", "css", "imagemin"], function() {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});

// 文件监控
gulp.task('watch', ["server"], function() {
    gulp.watch(["js/*.js", "lib/*.js", "index.html"]).on("change", browserSync.reload);
});

// 帮助任务
gulp.task('help', function() {
    console.log('   gulp build          文件打包');
    console.log('   gulp watch          文件监控');
    console.log('   gulp server         测试server');
    console.log('   gulp help           gulp参数说明');
});


// css 优化
gulp.task('css', function() {
    gulp.src('css/index.css')
        .pipe(autoprefixer({
            browsers: [
                '> 1%',
                'Firefox ESR'
            ],
            cascade: false // 关闭自动美化属性值，提升效率
        }))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(notify({ message: 'css 优化成功' }));
});

// js 优化
gulp.task("js", function() {
    gulp.src(["lib/util.js", "lib/md5.js", "lib/cookie.js", "lib/ajax.js", "lib/page.js", "lib/emitter.js", "lib/imgloader.js", "lib/animation.js", "lib/validator.js",
            "js/Notice.js", "js/Modal.js", "js/VideoModal.js", "js/LoginModal.js", "js/Follow.js", "js/Carousel.js", "js/TagCenter.js", "js/CourseFactory.js", "js/index.js"
        ])
        .pipe(concat("index.js"))
        .pipe(uglify({
            // mangle: { except: ['extend', 'this','self']},
            mangle: true, // 是否替换变量名
            compress: true, // 是否完全压缩
            // preserveComments: 'all' // 保留所有注释
        }))
        .pipe(gulp.dest("dist/js"))
        .pipe(notify({ message: 'js 文件合并成功' }));
});

// html 优化
gulp.task("html", function() {
    gulp.src(["raw-index.html"])
        .pipe(rename('index.html'))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeRedundantAttributes: true,
        }))
        .pipe(gulp.dest("dist/"))
        .pipe(notify({ message: 'html 文件优化成功' }));
});

// image 优化
gulp.task("imagemin", function() {
    gulp.src("imgs/*.{png,jpg,gif,icon}")
        .pipe(imagemin({
            optimizationLevel: 4,
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest("dist/imgs/"))
        .pipe(notify({ message: '图片文件压缩成功' }));
});
