let path = require('path')
let glob = require('glob')
let SpritesmithPlugin = require('webpack-spritesmith')
let { SkeletonPlugin } = require("page-skeleton-webpack-plugin")

function resolve(dir) {
    return path.join(__dirname, dir)
}
//配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
    let entries = {},
        basename, tmp, pathname, appname;

    glob.sync(globPath).forEach(function(entry) {
        basename = path.basename(entry, path.extname(entry));
        // console.log(entry)
        tmp = entry.split('/').splice(-3);
        console.log(tmp)
        pathname = basename; // 正确输出js和html的路径

        // console.log(pathname)
        entries[pathname] = {
            entry: resolve('src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[1] + '.ts'),
            template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
            title: tmp[2],
            filename: tmp[2]
        };
    });
    return entries;
}
// 我们可以在这里修改，可以自己打印一下 data里面的参数，看着就会大概明白（先看下面的配置，最后看这个模板
function templateFunction(data) {
    var shared = '.icon { background-image: url(I);background-size: Wpx Hpx;}'.replace('I', data.sprites[0].image).replace('W', data.spritesheet.width)
        .replace('H', data.spritesheet.height)

    var perSprite = data.sprites.map(function(sprite) {
        return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
            .replace('N', sprite.name)
            .replace('W', sprite.width)
            .replace('H', sprite.height)
            .replace('X', sprite.offset_x)
            .replace('Y', sprite.offset_y);
    }).join('\n');

    return shared + '\n' + perSprite;
};

let pages = getEntry('./src/pages/**?/*.html');

module.exports = {
    lintOnSave: false, //禁用eslint
    publicPath: '/',
    outputDir: 'dist',
    productionSourceMap: false,
    pages,
    css: {
        extract: true,
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem')({ remUnit: 75 }), // 换算的基数
                ]
            }
        }
    },

    devServer: {
        index: 'home.html', //默认启动serve 打开home页面
        open: true,
        host: '',
        port: '8082',
        https: false,
        hotOnly: false,
        proxy: ""
    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                // 修改它的选项...
                options.limit = 10000
                return options
            })
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@components', resolve('src/components'))
            .set('@utils', resolve('src/common/script'))
            .set('@api', resolve('src/api'))
        Object.keys(pages).forEach(entryName => {
            config.plugins.delete(`prefetch-${entryName}`);
        });
        if (process.env.NODE_ENV === "production") {
            config.plugin("extract-css").tap(() => [{
                path: path.join(__dirname, "./dist"),
                filename: "css/[name].[contenthash:8].css"
            }]);
        }
    },
    configureWebpack: config => {

        // 定义一个插件数组。用来覆盖，在里面使用我们的主角
        const Plugins = [
                new SpritesmithPlugin({
                    /*
                    目标小图标，这里就是你需要整合的小图片的老巢。
                    现在是一个个的散兵，把他们位置找到，合成一个
                    */
                    src: {
                        cwd: path.resolve(__dirname, './src/common/images/icon'),
                        glob: '*.png'
                    },
                    // 输出雪碧图文件及样式文件，这个是打包后，自动生成的雪碧图和样式，自己配置想生成去哪里就去哪里
                    target: {
                        image: path.resolve(__dirname, './src/common/images/sprite.png'),
                        css: [
                            [path.resolve(__dirname, './src/common/style/sprite.scss'), {
                                // 引用自己的模板
                                format: 'function_based_template'
                            }],
                        ]
                    },
                    // 自定义模板入口，我们需要基本的修改webapck生成的样式，上面的大函数就是我们修改的模板
                    customTemplates: {
                        'function_based_template': templateFunction,
                    },
                    // 打包的样式文件中,调用雪碧图的路径
                    apiOptions: {
                        cssImageRef: '../images/sprite.png'
                    },
                    // 让合成的每个图片有一定的距离，否则就会紧挨着，不好使用
                    spritesmithOptions: {
                        algorithm: 'binary-tree', // binary-tree,top-down从左到右和从上到下生成方向.
                        padding: 10
                    }
                }),
                new SkeletonPlugin({
                    pathname: path.resolve(__dirname, './shell'), // 用来存储 shell 文件的地址
                    staticDir: path.resolve(__dirname, './dist'), // 最好和 `output.path` 相同
                    routes: ['/', '/home'], // 将需要生成骨架屏的路由添加到数组中
                })
            ]
            // config里面，覆盖掉以前的，要不然不好使
        config.plugins = [...config.plugins, ...Plugins]
    }
}