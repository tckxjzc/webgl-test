process.env.tz_env='dev';
let getIp=require('../config/get-ip');
let port=8073;
let webpack = require('webpack');
let path=require('path');
let webpackConfig = require('../webpack.config');
webpackConfig.entry.app=webpackConfig.entry.app||[];
webpackConfig.entry.app.unshift(`webpack-dev-server/client?http://${getIp()}/`);
let compiler = webpack(webpackConfig);
let WebpackDevServer = require("webpack-dev-server");
// require('./server')();
let server=new  WebpackDevServer(compiler,{
    contentBase:path.join(__dirname,'../src'),
    host:'0.0.0.0',
    port:port,
    disableHostCheck: true,
    historyApiFallback: true,
    proxy: {
        '/api': {
            target: 'http://47.104.180.253:8200',
            pathRewrite:{'^/api':''},
            changeOrigin: true,
            secure: false
        },
        // '/':{
        //     // target:'http://localhost',
        //     bypass: function(req, res, proxyOptions) {
        //         if (req.headers.accept&&req.headers.accept.indexOf('html') !== -1) {
        //             return '/index.html';
        //         }
        //
        //     }
        // }
    }

});

let ip=require('../config/get-ip')();

server.listen(port,'',()=>{
    console.log(`http://${ip}:${port}`);
    // require('opn')(`http://${ip}:${port}`);
});