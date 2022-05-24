const {flutterwavebankURL, flutterwaveSecretKey, flutterwaveaccountURL, flutterwavepaymentURL, flutterwaveverifyURL} = require('../config/environment')
const {extractResponseProperty, generateReference} = require('../utils/helpers');
const {makeUrlCallWithoutData, makeUrlCallWithData} = require('../utils/configFunctions');
const {bankListResponse, verifyAccountResponse} = require('../config/response')


const callHeaders = {
    Authorization: `Bearer ${flutterwaveSecretKey}`
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
const getFlutterwaveBankList = async() => {
    try{
        //make bank list call with makeurl util by passing in banklist url, method and authorization header
        const callObject = {
            callUrl:flutterwavebankURL, 
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
const flutterwaveVerifyBankAccount = async(accountNumber, bankCode) => {
    try{
        const callObject = {
            callUrl:flutterwaveaccountURL, 
            callMethod:METHODS.POST, 
            callHeaders:callHeaders,
            callRequest: JSON.stringify({"account_number":accountNumber,"account_bank":bankCode})
        }
        const verifyAccountCall = await makeUrlCallWithData(callObject);
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
        return;
    }
}
 catch(error){
     throw 'Flutterwave verify bank account error';
    };


}


//make payment
const flutterwaveInitiateCheckout = async(emailAddress, amount, callbackUrl, others) => {
    try {
        const generatedReference = generateReference(15);
        const callObject = {
            callUrl: flutterwavepaymentURL,
            callMethod: METHODS.POST,
            callHeaders: callHeaders,
            callRequest:JSON.stringify({tx_ref: generatedReference, customer:{...others.customer, email:emailAddress}, amount: convertAmount(amount), redirect_url:callbackUrl, ...others.customizations})
        }
        const checkoutCall = await makeUrlCallWithData(callObject);
        if(checkoutCall){
            const outResponse = {
                link:'paymentUrl'
            }

            const checkoutDetail = await checkoutResponse(checkoutCall.data, outResponse);
            return {
                ...extractStatus(checkoutCall),
                checkout:{...checkoutDetail, reference: generatedReference}
            };  
        }
    }
    catch(e){
        throw e;
    }
    
}

//verify payment
const flutterwaveVerifyTransaction = async(paymentReference) => {
    try{
        //make bank list call with makeurl util by passing in banklist url, method and authorization header
        const callObject = {
            callUrl:`${flutterwaveverifyURLpaymentReference}/verify`, 
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
            const transactionVerification = await checkoutResponse(transactionVerificationCall.data, outResponse);
            return {
                ...extractStatus(transactionVerificationCall),
                transaction: {...transactionVerification, paymentAmount:reduceAmount(transactionVerification.paymentAmount)}
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
    getFlutterwaveBankList,
    flutterwaveVerifyBankAccount,
    flutterwaveInitiateCheckout,
    flutterwaveVerifyTransaction,
}