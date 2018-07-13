let webpack = require('webpack');
let path = require('path');
let webpackConfig = require('../config/webpack.prod.config');
let del=require('del');
del([path.resolve(__dirname,'../dist/**/*')],{force:true}).then((paths)=>{
    console.log('Deleted files and folders:\n', paths.join('\n'));
    webpack(webpackConfig, function (err, status) {
        console.log(status.toString());
        if (err) {
            console.log(err);
        }
    });
});