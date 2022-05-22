const {monnifyBankUrl, monnifyApiKey, monnifyLoginUrl} = require('../config/environment')
const {extractResponseProperty} = require('../utils/helpers');
const {makeUrlCall} = require('../utils/configFunctions');
const {bankListResponse} = require('../config/response')


const loginCallHeaders = {
    Authorization: `Bearer ${monnifyApiKey}`
};

const callHeaders = async() => {
    const accessToken  = await makeLoginCall();
    return {
        Authorization: `Bearer ${accessToken}`
    }
    
};

const METHODS = {
    GET:'get',
    POST:'post'
}

const extractStatus = (response) => ({
    status: extractResponseProperty("Successful", response),
    message: extractResponseProperty("responseMessage", response),
  });

const makeLoginCall = async() => {
    try {
        const callObject = {
            callUrl: monnifyLoginUrl,
            callMethod: METHODS.POST,
            callHeaders: loginCallHeaders,
        }
        const loginCall = await makeUrlCall(callObject);
        if(loginCall){
            return {
                accessToken: loginCall.responseBody.accessToken
            }
        }
    }
    catch(e){
        throw e;
    }
}


//get bank list
const getMonnifyBankList = async() => {
    try{
        //make bank list call with makeurl util by passing in banklist url, method and authorization header
        const callObject = {
            callUrl:flutterwavebankURL, 
            callMethod:METHODS.GET, 
            callHeaders:await callHeaders(), 
        }
        const bankListCall = await makeUrlCall(callObject);
        if(bankListCall){
            const outResponse = {
                name: "bankName",
                code: "bankCode"
            }
            const bankList = await bankListResponse(bankListCall.responseBody, outResponse);
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
    getMonnifyBankList,
}