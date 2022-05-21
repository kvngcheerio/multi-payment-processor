const {processor} = require('../config/environment');
const {paystack} = require('../processors');

const getAllBanks = async() => {
    try{
        switch (processor) {
            case "PAYSTACK":
              return paystack.getPaystackBankList();
            default:
              return paystack.getPaystackBankList();
          }
    }
    catch(e){
        throw 'Get all bank failed';
    }
}



module.exports = {
    getAllBanks,
}