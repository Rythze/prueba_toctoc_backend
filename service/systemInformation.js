const si = require('systeminformation');

exports.getUuid = () => si.system();
exports.getMemory = () => si.mem();
exports.getHostname = () => si.osInfo();