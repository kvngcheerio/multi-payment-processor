const {processor} = require('../config/environment');
const {paystack, flutterwave, monnify} = require('../processors');

const getAllBanks = async() => {
    try{
        if(!processor) 
            throw 'Please enter PROCESSOR in env file';
        switch (processor) {
            case "PAYSTACK":return paystack.getPaystackBankList();
            case "FLUTTERWAVE": return flutterwave.getFlutterwaveBankList();
            case "MONNIFY": return monnify.getMonnifyBankList();
          }
    }
    catch(e){
        throw 'Get all bank failed';
    }
}



module.exports = {
    getAllBanks,
}