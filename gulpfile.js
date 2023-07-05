const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const scss = require('gulp-sass')(require('sass'));
const cssbeautify = require('gulp-cssbeautify');
const del = require('del');
// 소스 루트 경로
const build = './build';
// 소스 세부 경로
const devPath = {
    html: ['page/**/*.html'],
    html2: ['center/**/*.html'],
    html3: ['voucher/**/*.html'],
    html4: ['monitoring/**/*.html'],
    html5: ['reservation/**/*.html'],
    css: 'assets/css/**/*.css',
    scss: 'assets/css/**/*.scss',
    cssUtils: 'assets/css/vendor/**/*',
    js: ['assets/js/**/*.js'],
    jsUtils: 'assets/js/vendor/**/*',
    images: 'assets/img/**/*.{gif,png,jpeg,jpg,svg,mp4}',
    fonts: 'assets/fonts/**/*',
    video: 'assets/video/**/*'
},
    buildPath = {
        html: build + '/page',
        html2: build + '/center',
        html3: build + '/voucher',
        html4: build + '/monitoring',
        html5: build + '/reservation',
        css: build + '/assets/css',
        cssUtils: build + '/assets/css/vendor',
        js: build + '/assets/js',
        jsUtils: build + '/assets/js/vendor',
        images: build + '/assets/img/',
        fonts: build + '/assets/fonts/',
        video: build + '/assets/video/',
    };
// build 폴더를 기준으로 웹서버 실행
gulp.task('server', function (done) {
    browserSync.init({
        server: {
            baseDir: './build/', // 웹서버 root폴더 경로 지정
            directory: true
        },
        browser: ["chrome", /*"firefox"*/] // 원하는 브라우저로 실행한다
    });
    done();
});
// build 파일 삭제
gulp.task('clean', function () {
    return new Promise(resolve => {
        del.sync(build);
        resolve();
    })
})
// HTML 파일을 minify
gulp.task('htmlComplie', function (done) {
    gulp.src(devPath.html, { allowEmpty: true }
        // , {since:gulp.lastRun('htmlComplie')}
    ) //src 폴더 아래의 모든 html 파일을
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(buildPath.html)) //위에 설정된 build 폴더에 저장
        .pipe(browserSync.reload({
            stream: true
        })); //browserSync 로 브라우저에 반영
    //reload 메서드의 옵션으로 stream:true를 주었기 때문에 변경된 파일만 stream 으로 브라우저에 전송되어 리프레시 없이도 반영이 가능한 경우 리프레시 없이 반영
    done();
});
gulp.task('htmlCenterComplie', function (done) {
    gulp.src(devPath.html2, { allowEmpty: true }
        // , {since:gulp.lastRun('htmlComplie')}
    ) //src 폴더 아래의 모든 html 파일을
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(buildPath.html2)) //위에 설정된 build 폴더에 저장
        .pipe(browserSync.reload({
            stream: true
        })); //browserSync 로 브라우저에 반영
    //reload 메서드의 옵션으로 stream:true를 주었기 때문에 변경된 파일만 stream 으로 브라우저에 전송되어 리프레시 없이도 반영이 가능한 경우 리프레시 없이 반영
    done();
});
gulp.task('htmlVoucherComplie', function (done) {
    gulp.src(devPath.html3, { allowEmpty: true }
        // , {since:gulp.lastRun('htmlComplie')}
    ) //src 폴더 아래의 모든 html 파일을
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(buildPath.html3)) //위에 설정된 build 폴더에 저장
        .pipe(browserSync.reload({
            stream: true
        })); //browserSync 로 브라우저에 반영
    //reload 메서드의 옵션으로 stream:true를 주었기 때문에 변경된 파일만 stream 으로 브라우저에 전송되어 리프레시 없이도 반영이 가능한 경우 리프레시 없이 반영
    done();
});
gulp.task('htmlMonitoringComplie', function (done) {
    gulp.src(devPath.html4, { allowEmpty: true }
        // , {since:gulp.lastRun('htmlComplie')}
    ) //src 폴더 아래의 모든 html 파일을
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(buildPath.html4)) //위에 설정된 build 폴더에 저장
        .pipe(browserSync.reload({
            stream: true
        })); //browserSync 로 브라우저에 반영
    //reload 메서드의 옵션으로 stream:true를 주었기 때문에 변경된 파일만 stream 으로 브라우저에 전송되어 리프레시 없이도 반영이 가능한 경우 리프레시 없이 반영
    done();
});
gulp.task('htmlReservationComplie', function (done) {
    gulp.src(devPath.html5, { allowEmpty: true }
        // , {since:gulp.lastRun('htmlComplie')}
    ) //src 폴더 아래의 모든 html 파일을
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(buildPath.html5)) //위에 설정된 build 폴더에 저장
        .pipe(browserSync.reload({
            stream: true
        })); //browserSync 로 브라우저에 반영
    //reload 메서드의 옵션으로 stream:true를 주었기 때문에 변경된 파일만 stream 으로 브라우저에 전송되어 리프레시 없이도 반영이 가능한 경우 리프레시 없이 반영
    done();
});
// SCSS 파일을 minify
gulp.task('scssCompile', function (done) {
    gulp.src(devPath.scss, { allowEmpty: true }, {
        since: gulp.lastRun('scssCompile')
    }) //_scss 폴더의 *.scss 파일을
        .pipe(scss({
            sourceComments: false, // 컴파일 된 CSS에 원본소스의 위치와 줄수 주석표시
        }).on('error', scss.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: [
                "> 5%", // browsers versions selected by global usage statistics. >=, < and <= work too.
                "Firefox > 1", // versions of Firefox newer than 20. >=, < and <= work too. It also works with Node.js.
                "last 2 versions" // he last 2 versions for each browser.
            ]
        }))
        .pipe(cssbeautify({
            indent: '\t',
            autosemicolon: true
        }))
        .pipe(gulp.dest(buildPath.css)) //위에 설정된 build 폴더에 저장
        .pipe(browserSync.reload({
            stream: true
        })); //browserSync 로 브라우저에 반영
    done();
});
// CSS 파일을 minify
gulp.task('cssCompile', function (done) {
    gulp.src(devPath.css, { allowEmpty: true }, {
        since: gulp.lastRun('cssCompile')
    }) //css 폴더의 *.css 파일을
        .pipe(autoprefixer({
            overrideBrowserslist: [
                "> 5%", // browsers versions selected by global usage statistics. >=, < and <= work too.
                "Firefox > 1", // versions of Firefox newer than 20. >=, < and <= work too. It also works with Node.js.
                "last 2 versions" // he last 2 versions for each browser.
            ]
        }))
        .pipe(cssbeautify({
            indent: '\t',
            autosemicolon: true
        }))
        .pipe(gulp.dest(buildPath.css)) //위에 설정된 build 폴더에 저장
        .pipe(browserSync.reload({
            stream: true
        })); //browserSync 로 브라우저에 반영
    done();
});
gulp.task('cssUtilCompile', function (done) {
    gulp.src(devPath.cssUtils, { allowEmpty: true }, {
        since: gulp.lastRun('cssUtilCompile')
    })
        .pipe(gulp.dest(buildPath.cssUtils)) //위에 설정된 build 폴더에 저장
        .pipe(browserSync.reload({
            stream: true
        }));
    done();
});
// JavaScript minify
gulp.task('jsCompile', function (done) {
    gulp.src(devPath.js, { allowEmpty: true }, {
        since: gulp.lastRun('jsCompile')
    })
        .pipe(gulp.dest(buildPath.js)) //위에 설정된 build 폴더에 저장
        .pipe(browserSync.reload({
            stream: true
        }));
    done();
});
gulp.task('jsUtilCompile', function (done) {
    gulp.src(devPath.jsUtils, { allowEmpty: true }, {
        since: gulp.lastRun('jsUtilCompile')
    })
        .pipe(gulp.dest(buildPath.jsUtils)) //위에 설정된 build 폴더에 저장
        .pipe(browserSync.reload({
            stream: true
        }));
    done();
});
// 이미지 압축
gulp.task('imgMinCompile', function (done) {
    gulp.src(devPath.images, { allowEmpty: true }, {
        since: gulp.lastRun('imgMinCompile')
    })
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            verbose: false
        })) //이미지 최적화
        .pipe(gulp.dest(buildPath.images)) //동시에 build에도 출력
        .pipe(gulp.dest('assets/img/'));
    done();
});
// 폰트
gulp.task('fontCompile', function (done) {
    gulp.src(devPath.fonts, { allowEmpty: true })
        .pipe(gulp.dest(buildPath.fonts))
        .pipe(browserSync.reload({
            stream: true
        }));
    done();
});
// 비디오
gulp.task('videoCompile', function (done) {
    gulp.src(devPath.video, { allowEmpty: true })
        .pipe(gulp.dest(buildPath.video))
        .pipe(browserSync.reload({
            stream: true
        }));
    done();
});
// 스타일 가이드 빌드파일 안으로
gulp.task('styleGuideCompile', function (done) {
    gulp.src(['guide.html', 'filepath_admin.html'], { allowEmpty: true })
        .pipe(gulp.dest([build]))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src(['styleguide/*'])
        .pipe(gulp.dest([build + '/styleguide'], { allowEmpty: true }))
        .pipe(browserSync.reload({
            stream: true
        }));
    gulp.src(['guide_common/**/*'])
        .pipe(gulp.dest([build + '/guide_common'], { allowEmpty: true }))
        .pipe(browserSync.reload({
            stream: true
        }));
    done();
});
// 파일 변경 감지
gulp.task('watch', function (done) {
    //src 디렉토리 안에 html 확장자를 가진 파일이 변경되면 htmlComplie task 실행
    gulp.watch(devPath.html, gulp.series('htmlComplie'));
    gulp.watch(devPath.html2, gulp.series('htmlCenterComplie'));
    gulp.watch(devPath.html3, gulp.series('htmlVoucherComplie'));
    gulp.watch(devPath.html4, gulp.series('htmlMonitoringComplie'));
    gulp.watch(devPath.html5, gulp.series('htmlReservationComplie'));
    //src 디렉토리 안에 css 확장자를 가진 파일이 변경되면 cssCompile task 실행
    gulp.watch(devPath.css, gulp.series('cssCompile', 'htmlComplie', 'htmlCenterComplie', 'htmlVoucherComplie', 'htmlMonitoringComplie', 'htmlReservationComplie', 'styleGuideCompile'));
    //src 디렉토리 안에 scss 확장자를 가진 파일이 변경되면 scssCompile task 실행
    gulp.watch(devPath.scss, gulp.series('scssCompile', 'htmlComplie', 'htmlCenterComplie', 'htmlVoucherComplie', 'htmlMonitoringComplie', 'htmlReservationComplie', 'styleGuideCompile'));
    //src 디렉토리 안에 js 확장자를 가진 파일이 변경되면 jsCompile task 실행
    gulp.watch(devPath.js, gulp.series('jsCompile'));
    //src 디렉토리 안에 js/vendor 폴더 파일이 변경되면 jsUtilCompile task 실행
    gulp.watch(devPath.jsUtils, gulp.series('jsUtilCompile'));
    //src 디렉토리 안에 js 확장자를 가진 파일이 변경되면 imgMinCompile task 실행
    // gulp.watch(devPath.images, gulp.series('imgMinCompile'));
    //font파일 변경 감지
    gulp.watch(devPath.fonts, gulp.series('fontCompile'));
    //include파일 변경감지
    gulp.watch(['_include/**/*'], gulp.series('scssCompile', 'htmlComplie', 'htmlCenterComplie', 'htmlVoucherComplie', 'htmlMonitoringComplie', 'htmlReservationComplie'));
    //가이드파일 변경 감지
    gulp.watch(['guide.html', 'filepath_admin.html', 'styleguide/*', 'guide_common/**/*'], gulp.series('styleGuideCompile'));
    done();
});
// gulp를 실행하면 default 로 server task와 watch task, imgMinCompile task를 실행
// series = 순차
// parallel = 동시 or 병렬(실행은 동시에 시작되지만 처리속도에 따라 종료시점이 달라진다)
gulp.task('default', gulp.series('clean', 'jsCompile', 'jsUtilCompile', 'scssCompile', 'cssCompile', 'cssUtilCompile', 'htmlComplie', 'htmlCenterComplie', 'htmlVoucherComplie', 'htmlMonitoringComplie', 'htmlReservationComplie', 'imgMinCompile', 'fontCompile', 'videoCompile', 'styleGuideCompile', gulp.parallel('watch', 'server')));