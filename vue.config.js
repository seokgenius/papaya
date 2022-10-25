const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
//http://211.254.212.184:8089/api/v1
const target = 'http://localhost:3000';
module.exports={
    devServer:{
        port:8080,
        proxy:{
            '^/v1':{
                target,
                changeOrigin:true
            }
        },
        historyApiFallback: true,
    },
    // productionSourceMap: false,
    chainWebpack: (config) => {
        config.plugin("fork-ts-checker").tap((args) => {
            args[0].memoryLimit = 512;
            return args;
        });
    },
    configureWebpack:{
        module:{
            rules:[
                {
                    test:/.html$/,
                    loader:"vue-template-loader",
                    exclude:/index.html/
                },
                /*{
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                esModule: false,
                                name: '[name].[ext]?[hash]',
                                publicPath: './dist/',
                                limit: 4096,
                            },
                        },
                    ],
                }*//*,
                */
            ]
        },
        plugins: [new BundleAnalyzerPlugin(), new VuetifyLoaderPlugin({
            /**
             * This function will be called for every tag used in each vue component
             * It should return an array, the first element will be inserted into the
             * components array, the second should be a corresponding import
             *
             * originalTag - the tag as it was originally used in the template
             * kebabTag    - the tag normalized to kebab-case
             * camelTag    - the tag normalized to PascalCase
             * path        - a relative path to the current .vue file
             * component   - a parsed representation of the current component
             */
            match (originalTag, { kebabTag, camelTag, path, component }) {
                if (kebabTag.startsWith('core-')) {
                    return [
                        camelTag,
                        `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`
                    ]
                }
            }
        })]
    },
    css:{
        loaderOptions: {
            postcss: {
                ident: 'postcss',
                plugins: [ require('autoprefixer')]
            }
        }
    }
    /* ,
    css: {
        loaderOptions: {
            scss: {
                prependData:`
                @import "@/assets/scss/common.scss";
                @import "@/assets/scss/pages.scss";
                `
            }
        }
    }
    //위 코드는 어떤 컴포넌트에서 로컬에서 사용되는 css class 가 있다면 해당 부분만 로드시킨다.
   //위의 코드는 모든 컴포넌트의 스타일 태그에 지정한 SCSS의 코드를 넣는 처리가 수행되므로 참조하는 컴포넌트가
   // 여러개인 경우 (router-view등을 사용하여 수많은 자식 컴포넌트를 임포트하는 경우 등) 에는
    //자식 컴포넌트의 개수만큼 같은 스타일이 중복되어 적용.
    */
}
