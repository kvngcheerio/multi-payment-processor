const {paystackBankUrl, paystackSecretKey, paystackVerifyAccountUrl, paystackURL, paystackTransactionVerificationUrl} = require('../config/environment')
const {extractResponseProperty, convertAmount} = require('../utils/helpers');
const {makeUrlCallWithoutData, makeUrlCallWithData} = require('../utils/configFunctions');
const {bankListResponse, verifyAccountResponse, checkoutResponse} = require('../config/response')


const callHeaders = {
    Authorization: `Bearer ${paystackSecretKey}`
};

const METHODS = {
    GET:'get',
    POST:'post'
}


const extractStatus = (response) => ({
    status: extractResponseProperty("status", response),
    message: extractResponseProperty("message", response),
  });


//get bank list
const getPaystackBankList = async() => {
    try{
        //make bank list call with makeurl util by passing in banklist url, method and authorization header
        const callObject = {
            callUrl:paystackBankUrl, 
            callMethod:METHODS.GET, 
            callHeaders:callHeaders, 
        }
        const bankListCall = await makeUrlCallWithoutData(callObject);
        if(bankListCall){
            const outResponse = {
                name: "bankName",
                code: "bankCode"
            }
            const bankList = await bankListResponse(bankListCall.data, outResponse);
            return {
                ...extractStatus(bankListCall),
                banks: bankList
            };  
        }
        
        else {
            throw 'invalid call';
        }
    }
    catch(err){
        throw 'Bank list error';
    }
}

//verify bank account
const paystackVerifyBankAccount = async(accountNumber, bankCode) => {
    try{
        const callObject = {
            callUrl:`${paystackVerifyAccountUrl}?account_number=${accountNumber}&bank_code=${bankCode}`, 
            callMethod:METHODS.GET, 
            callHeaders:callHeaders
        }
        const verifyAccountCall = await makeUrlCallWithoutData(callObject);
        if(verifyAccountCall){
            const outResponse = {
                account_name: "accountName",
                account_number: "accountNumber"
            }
            const accountDetail = await verifyAccountResponse(verifyAccountCall.data, outResponse);
            return {
                ...extractStatus(verifyAccountCall),
                accountDetail: {...accountDetail, bankCode}
            };  
        }
        else {
        throw 'invalid call';
    }
}
 catch(error){
     throw 'Paystack verify bank account error';
    };


}

//make payment
const paystackInitiateCheckout = async(emailAddress, amount, callbackUrl) => {
    try {
        const callObject = {
            callUrl: paystackURL,
            callMethod: METHODS.POST,
            callHeaders: callHeaders,
            callRequest:{email:emailAddress, amount: convertAmount(amount), callbackUrl:callbackUrl}
        }
        const checkoutCall = await makeUrlCallWithData(callObject);
        if(checkoutCall){
            const outResponse = {
                authorization_url:'paymentUrl',
                reference:'paumentReference'
            }

            const checkoutDetail = await checkoutResponse(checkoutCall.data, outResponse);
            return {
                ...extractStatus(checkoutCall),
                checkout:checkoutDetail
            };  
        }
    }
    catch(e){
        throw e;
    }
    
}

//verify payment
const paystackVerifyTransaction = async(paymentReference) => {
    try{
        //make bank list call with makeurl util by passing in banklist url, method and authorization header
        const callObject = {
            callUrl:`${paystackTransactionVerificationUrl}/${paymentReference}`, 
            callMethod:METHODS.GET, 
            callHeaders:callHeaders, 
        }
        const transactionVerificationCall = await makeUrlCallWithoutData(callObject);
        if(transactionVerificationCall){
            const outResponse = {
                amount: "paymentAmount",
                status: "paymentStatus",
                reference: "paymentReference",
                channel: "paymentChannel",
                fees:"paymentFees"
            }
            const transactionVerification = await bankListResponse(transactionVerificationCall.data, outResponse);
            return {
                ...extractStatus(transactionVerificationCall),
                transaction: transactionVerification
            };  
        }
        
        else {
            throw 'invalid call';
        }
    }
    catch(err){
       throw err
    }

}



module.exports = {
    getPaystackBankList,
    paystackVerifyBankAccount,
    paystackInitiateCheckout,
    paystackVerifyTransaction,
}