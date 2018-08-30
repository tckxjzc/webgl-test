let browserSync=require('browser-sync').create();
browserSync.init({
    server:{
         baseDir: "../src",
        //baseDir: "F:\\Program Files\\哈梅斯塔西亚王国\\www",
        proxy: {
            target: "http://yourlocal.dev",
        }
    }
});