const {processor} = require('../config/environment');
const {paystack} = require('../processors');

const verifyBankAccount = async({accountNumber:accountNumber, bankCode: bankCode}) => {
    try{
        if(!processor) 
            throw 'Please enter PROCESSOR in env file';
        switch (processor) {
            case "PAYSTACK":return paystack.paystackVerifyBankAccount(accountNumber, bankCode);
          }
    }
    catch(e){
        throw 'Get all bank failed';
    }
}



module.exports = {
    verifyBankAccount
}