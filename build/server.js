const browserSync = require("browser-sync").create();
let path = require('path');

browserSync.init({
    server:[
        'G:\\Documents\\WebGL_Guide_Code\\ch10',
        'G:\\Documents\\WebGL_Guide_Code',
    ]
});

