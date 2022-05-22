const {flutterwavebankURL, flutterwaveSecretKey} = require('../config/environment')
const {extractResponseProperty} = require('../utils/helpers');
const {makeUrlCall} = require('../utils/configFunctions');
const {bankListResponse} = require('../config/response')


const callHeaders = {
    Authorization: `Bearer ${flutterwaveSecretKey}`
};

const currency = {
    NGN: "NGN",
};

const status = {
    Success: 'success',
}

const METHODS = {
    GET:'get',
    POST:'post'
}

const extractStatus = (response) => ({
    status: extractResponseProperty("status", response),
    status_message: extractResponseProperty("message", response),
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
        const bankListCall = await makeUrlCall(callObject);
        if(bankListCall){
            const outResponse = {
                name: "bankName",
                code: "bankCode"
            }
            const bankList = await bankListResponse(bankListCall, outResponse);
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


module.exports = {
    getFlutterwaveBankList,
}