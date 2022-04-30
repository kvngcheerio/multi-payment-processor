const {processor} = require('../config/environment');
const {paystack} = require('../processors');



const verifyBankAccount = async({inMap}) => {
    try{
        const {accountNumber, bankCode} = inMap;
        //add validator
        
        switch (processor) {
            case "PAYSTACK":
                return paystack.paystackVerifyBankAccount(accountNumber, bankCode);
            default:
              return paystack.paystackVerifyBankAccount(accountNumber, bankCode);
          }

    }
    catch(e){
        console.log('failed to verify bank account', e)
    }
}


module.exports = {
    verifyBankAccount,
}