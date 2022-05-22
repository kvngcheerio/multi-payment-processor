const {getAllBanks} = require('./bankList')
const {verifyBankAccount} = require('./accountVerification')
const {initiateCheckout, verifyTransaction} = require('./checkout')
module.exports = {
    getAllBanks,
    verifyBankAccount,
    initiateCheckout,
    verifyTransaction
}
