const {processor} = require('../config/environment');
const {paystack} = require('../processors');

const initiateCheckout = async({emailAddress:emailAddress, amount:amount, callbackUrl:callbackUrl}) => {
    try{
        if(!processor) 
            throw 'Please enter PROCESSOR in env file';
        switch (processor) {
            case "PAYSTACK":return paystack.paystackInitiateCheckout(emailAddress, amount, callbackUrl);
          }
    }
    catch(e){
        throw 'intiating checkout failed';
    }
}

const verifyTransaction = async({paymentReference: paymentReference}) => {
    try{
        if(!processor) 
            throw 'Please enter PROCESSOR in env file';
        switch (processor) {
            case "PAYSTACK":return paystack.paystackVerifyTransaction(paymentReference);
          }
    }
    catch(e){
        throw 'intiating checkout failed';
    }
}



module.exports = {
    initiateCheckout,
    verifyTransaction,
}