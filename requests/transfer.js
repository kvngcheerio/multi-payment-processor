const {processor} = require('../config/environment');
const {flutterwave} = require('../processors');

const initiateTransfer = async({bankCode:bankCode, accountNumber:accountNumber, amount:amount, currency:currency, narration:narration, callbackUrl:callbackUrl, others}) => {
    try{
        if(!processor) 
            throw 'Please enter PROCESSOR in env file';
        switch (processor) {
            case "FLUTTERWAVE":
                return flutterwave.flutterwaveInitiateTransfer(bankCode, accountNumber, amount, currency, narration, callbackUrl, others);
          }
    }
    catch(e){
        throw 'intiating transfer failed';
    }
}




module.exports = {
    initiateTransfer
}