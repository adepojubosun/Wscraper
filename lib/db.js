var mongoose = require('mongoose');
var config = require('../config.json');
var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
mongoose.connect(config.mongoUrl, opts);

module.exports = mongoose;