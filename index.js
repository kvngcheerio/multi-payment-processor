'use strict';

require("dotenv").config({silent: true});
require('./config');
require('./utils');
require('./processors')
const {getAllBanks} = require('./requests/bankList');
const {verifyBankAccount} = require('./requests/accountVerification')


module.exports = {
    getAllBanks,
    verifyBankAccount,
}