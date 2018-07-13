let path=require('path');
module.exports = {
    title: '',
    isProds:process.env.tz_env!=='dev',
    dist:path.resolve(__dirname,'../dist'),
    resourceOutput: 'resource',
    publicPath:'/'
};