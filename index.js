'use strict';

require("dotenv").config({silent: true});
require('./config');
require('./utils');
const {bankList} = require('./requests');


module.exports = {
    bankList
}