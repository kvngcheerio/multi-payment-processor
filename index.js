'use strict';

require("dotenv").config({silent: true});
require('./config');
require('./utils');
require('./processors')
const {getAllBanks} = require('./requests/bankList');
const {verifyBankAccount} = require('./requests/accountVerification')
const {initiateCheckout, verifyTransaction} = require('./requests/checkout')


module.exports = {
    getAllBanks,
    verifyBankAccount,
    initiateCheckout,
    verifyTransaction
}