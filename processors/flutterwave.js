const {flutterwavebankURL, flutterwaveSecretKey, flutterwaveaccountURL, flutterwavepaymentURL, flutterwaveverifyURL, flutterwavetransferURL} = require('../config/environment')
const {extractResponseProperty, generateReference} = require('../utils/helpers');
const {makeUrlCallWithoutData, makeUrlCallWithData} = require('../utils/configFunctions');
const {bankListResponse, verifyAccountResponse, checkoutResponse, transferResponse} = require('../config/response')


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
        const generatedReference = await generateReference(15);
        const callObject = {
            callUrl: flutterwavepaymentURL,
            callMethod: METHODS.POST,
            callHeaders: callHeaders,
            callRequest: JSON.stringify({tx_ref: generatedReference, customer:{email:emailAddress}, amount: amount, redirect_url:callbackUrl, ...others})
        }
        const checkoutCall = await makeUrlCallWithData(callObject);
        
        if(checkoutCall){
            const outResponse = {
                link:'paymentUrl'
            }
            const checkoutDetail = await checkoutResponse(checkoutCall.data, outResponse);
            return {
                ...extractStatus(checkoutCall),
                checkout:{...checkoutDetail, paymentReference: generatedReference}
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

        //make verify transaction call with makeurl util by passing in verify transaction url, method and authorization header
        const callObject = {
            callUrl:`${flutterwaveverifyURL+paymentReference}/verify`, 
            callMethod:METHODS.GET, 
            callHeaders:callHeaders, 
        }
        const transactionVerificationCall = await makeUrlCallWithoutData(callObject);
        if(transactionVerificationCall){
            const outResponse = {
                amount: "paymentAmount",
                status: "paymentStatus",
                tx_ref: "paymentReference",
                payment_type: "paymentChannel",
                app_fee:"paymentFees"
            }
            const transactionVerification = await checkoutResponse(transactionVerificationCall.data, outResponse);
            return {
                ...extractStatus(transactionVerificationCall),
                transaction: {...transactionVerification}
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

//initiate transfer
const flutterwaveInitiateTransfer = async(bankCode, accountNumber, amount, currency, narration, callbackUrl, others)=> {
    try{
        //make bank list call with makeurl util by passing in banklist url, method and authorization header
        const callObject = {
            callUrl:flutterwavetransferURL, 
            callMethod:METHODS.POST, 
            callHeaders:callHeaders, 
            callRequest: JSON.stringify({ ...others, account_bank: bankCode, account_number: accountNumber,amount: amount, narration: narration,currency: currency, callback_url: callbackUrl,}
            )
        }
        const transferCall = await makeUrlCallWithData(callObject);
        if(transferCall){
            const outResponse = {
                account_number: "accountNumber",
                bank_code: "bankCode",
                full_name: "fullName",
                currency: "transferCurrency",
                debit_currency: "debitCurrency",
                amount: "transferAmount",
                fee: "transferFee",
                status: "transferStatus",
                reference: "transferReference",
            }
            const transfer = await transferResponse(transferCall.data, outResponse);
            return {
                ...extractStatus(transferCall),
                transaction: {...transfer}
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
    flutterwaveInitiateTransfer,
}