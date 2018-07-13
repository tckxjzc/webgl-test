let merge=require('webpack-merge');
let HtmlWebpackPlugins=require('html-webpack-plugin');
const PreloadWebpackPlugin=require('preload-webpack-plugin');
let path=require('path');
let config=require('./config');
let {dist,title}=config;
let baseConfig=require('./webpack.base');
let webpack=require('webpack');
module.exports=merge(baseConfig,{
    mode:'production',
    externals:{
        'react':'React',
        'react-dom': 'ReactDOM',
        'react-router-dom':'ReactRouterDOM',
        'swiper':'Swiper'
    },
    plugins:[
        new webpack.DefinePlugin({
            'wbp.dev':'false'
        }),
        new HtmlWebpackPlugins({
            title:title,
            minify:{
                removeComments: true, //清除HTML注释
                collapseWhitespace: true, //压缩HTML
                collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input checked />
                removeEmptyAttributes: false, //删除所有空格作属性值 <input id="" /> ==> <input />
                removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
                removeStyleLinkTypeAttributes: false, //删除<style>和<link>的type="text/css"
                minifyJS: true, //压缩页面JS
                minifyCSS: true //压缩页面CSS
            },
            template: path.join(__dirname,'../src/template/index-load.html'),
            library:[
                // 'https://cdn.bootcss.com/react/16.4.0-alpha.0911da3/umd/react.production.min.js',
                // 'https://cdn.bootcss.com/react-dom/16.4.0-alpha.0911da3/umd/react-dom.production.min.js'
            ],
            filename:`${dist}/index.html`
        }),
        new PreloadWebpackPlugin()
    ]
});