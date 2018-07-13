let merge=require('webpack-merge');
let HtmlWebpackPlugins=require('html-webpack-plugin');

let baseConfig=require('./config/webpack.base');
let config=require('./config/config');
let {dist,title}=config;
let path=require('path');
let webpack=require('webpack');
module.exports=merge(baseConfig,{
    mode:'none',
    plugins:[
        new webpack.DefinePlugin({
            'wbp.dev':'true'
        }),
        new HtmlWebpackPlugins({
            title:title,
            template: path.join(__dirname,'./src/template/index-load.html'),
            filename:`${dist}/index.html`,
        })
    ]
});