let path = require('path');
let config = require('./config');

let {dist,isProds, resourceOutput,publicPath} = config;
let utils=require('../config/utils');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
let include = {
    include: [
        path.resolve(__dirname, '../src'),
        path.resolve(__dirname, '../library'),
        path.resolve(__dirname, '../node_modules/tz-library'),
        path.resolve(__dirname, '../wecash')
    ],
   /* exclude: [
        path.resolve(__dirname, "../node_modules"),
    ]*/
};

module.exports = {
    entry: {
        'main': path.join(__dirname, '../src/main.tsx')
    },
    output: {
        filename: resourceOutput + '/[name]_[chunkhash:8].js',
        chunkFilename: resourceOutput + '/chunk/[name]_[chunkhash:8].js',
        path: dist,
        publicPath: publicPath
    },
    resolve: {
        plugins: [new TsconfigPathsPlugin({configFile: path.join(__dirname, '../tsconfig.json')})],
        alias: {
            'src': path.join(__dirname, './src'),
            'components': path.join(__dirname, '../src/components'),
            'lang': path.join(__dirname, '../src/lang'),
            'pages': path.join(__dirname, '../src/pages'),
            'assets': path.join(__dirname, '../src/assets'),
            'data': path.join(__dirname, '../src/data'),
            'style': path.join(__dirname, '../src/style')
        },
        extensions: ['.js', '.jsx','.ts','.tsx'],
        symlinks: false
    },
    module: {
        rules: [
            {
                test: /\.(txt|glsl|vert|frag|obj|mtl)$/,
                use: 'raw-loader'
            },
            {
                test: /\.(js|jsx)$/,
                use: [
                    'babel-loader',
                    'eslint-loader'
                ],
                ...include
            },
            {
                test: /\.(ts|tsx)$/,
                use: [
                    'babel-loader',
                    // 'eslint-loader',
                    "ts-loader"
                ],
                ...include
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                query: {
                    limit: 5120,
                    outputPath: `${resourceOutput}/assets/`,
                }
            },
            {
                test: /\.global.scss$/,
                use: utils.getScssLoader(false,isProds)
            },
            {
                test: /\.css$/,
                use: utils.getScssLoader(false,isProds)
            },
            {
                test:(name)=> {
                    if (name.indexOf('global')>-1) {
                        return false;
                    }
                    return name.endsWith('.scss');
                }
                ,
                use:utils.getScssLoader(true,isProds)
            }
        ]
    }


};