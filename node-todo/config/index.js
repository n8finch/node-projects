var configValues = require('../private/config');

module.exports = {
    getDbConnectionString: function () {
        return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds149069.mlab.com:49069/n8f_nodetodosample';
    }
};