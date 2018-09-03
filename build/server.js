const browserSync = require("browser-sync").create();
let path=require('path');
module.exports= function () {
    browserSync.init({
        server:path.resolve(__dirname,'../src')
    });
};
