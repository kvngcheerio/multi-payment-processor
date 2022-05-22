const {processor} = require('../config/environment');
const {paystack, flutterwave} = require('../processors');

const getAllBanks = async() => {
    try{
        if(!processor) 
            throw 'Please enter PROCESSOR in env file';
        switch (processor) {
            case "PAYSTACK":return paystack.getPaystackBankList();
            case "FLUTTERWAVE": return flutterwave.getFlutterwaveBankList();
          }
        
    
    }
    catch(e){
        throw 'Get all bank failed';
    }
}



module.exports = {
    getAllBanks,
}