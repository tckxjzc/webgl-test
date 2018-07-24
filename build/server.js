const browserSync = require("browser-sync").create();

module.exports= function () {
    browserSync.init({
        server:'../src'
    });
};
