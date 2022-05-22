const {flutterwavebankURL, flutterwaveSecretKey, flutterwaveaccountURL} = require('../config/environment')
const {extractResponseProperty} = require('../utils/helpers');
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


module.exports = {
    getFlutterwaveBankList,
    flutterwaveVerifyBankAccount
}