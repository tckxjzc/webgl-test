let os = require('os'), iptable = {}, ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach((item) => {
    ifaces[item].forEach((details) => {
        if (details.family === 'IPv4') {
            iptable[item] = details.address;
        }
    });
});
// console.log(iptable);

module.exports = () => {
    for (let item in iptable) {
        if(iptable.hasOwnProperty(item)){
            if (iptable[item] !== '127.0.0.1') {
                return iptable[item]
            }
        }


    }
    return '127.0.0.1';
};