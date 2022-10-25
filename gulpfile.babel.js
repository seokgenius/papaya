import del from 'del';
import gulp from 'gulp';
import sassComplie from 'gulp-sass';
import watch from 'gulp-watch';
import autoPrefixer from 'gulp-autoprefixer';
import sourceMaps from 'gulp-sourcemaps';
import Fiber from 'fibers';


const autoPreFixerBrowsers = ["last 4 version", "not IE 8"];
/**
 * scss 컴파일링.
 * @returns {*}
 */
function compileSass(type='local', isSourceMap=false) {
    // expanded - 표준 css / compact -  한줄로 나타내는 스타일의 css 파일 / compressed - 빈공간이 없는 압축된 스타일의 css 파일
    let outputType = (type === 'local') ? 'expanded' : 'compressed';
    const sassOption = {
        outputStyle: outputType,  // expanded(표준) , compact( 한줄 ) , compressed( 압축 )
        fiber: Fiber,  // 고루틴 방식으로 실행  - 고루틴 ( Coroutine ) 여러 일을 순차적으로 할 수 있는 함수 / 특히 비동기 방식을 순차적 실행 효과
        indentType: "space",  // space, tab
        indentWidth: 4, // outputStyle 이 nested, expanded 인 경우에 사용
        precision: 4,  // 컴파일 된 CSS 의 소수점 자리수.
        sourceComments: false // 코멘트 제거 여부
    }
    const sourceMapCompile=() => {
        return gulp.src(`${paths.scss}.scss`)
            .pipe( sourceMaps.init() )
            .pipe(sassComplie( sassOption ).on("error", sassComplie.logError))
            .pipe(autoPrefixer(autoPreFixerBrowsers))
            .pipe(sourceMaps.write(`.`))
    }
    const normalCompile=()=>{
        return gulp.src(`${paths.scss}.scss`)
            .pipe(sassComplie( sassOption ).on("error", sassComplie.logError))
            .pipe(autoPrefixer(autoPreFixerBrowsers))
    }
    return ( isSourceMap === false )? normalCompile() : sourceMapCompile();
}

function localSassToCss() {
    return compileSass('local', true)
        .pipe( gulp.dest(paths.css) );
}
const paths = {
    root: 'markup',
    css: 'markup/pages/assets/css',
    scss:'markup/pages/assets/scss/*'
};
const cleanClientCss = () => del([`${paths.css}`], {force: true});
const localWatch = () => {
    watch(`${paths.scss}`, localSassToCss);
    watch(`${paths.root}/**/*`, (e) => {
        console.log(`${e.event}: ${e.path.split("/").pop()}`);
    });
};

//local
const dev = gulp.series(cleanClientCss, localSassToCss,  localWatch);

//최종 출판
export { dev }


