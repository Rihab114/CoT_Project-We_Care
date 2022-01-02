var config = {
    local: {
        mode: 'local',
        port: 3000,
        privateKey: 'certificates/127.0.0.1-key.pem',
        certificate : 'certificates/127.0.0.1.pem',
        dhparam: 'certificates/dh-strong.pem',
        validityTime : 3600
    },
    staging: {
        mode: 'staging',
        port: 4000
    },
    production: {
        mode: 'production',
        port: 443,
        validityTime : 1020
    }
}

module.exports = function(mode) {
    return config[mode || process.argv[2] || 'local'] || config.local;
}