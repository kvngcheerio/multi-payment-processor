const axios = require('axios');
const {paystackBankUrl} = require('../config/environment')
const {extractResponseProperty} = require('../utils/helpers');
const {makeUrlCall} = require('../utils/configFunctions');
const {bankListResponse} = require('../config/response')


const callHeaders = {
    Authorization: `Bearer ${paystackKey}`
};

const currency = {
    NGN: "NGN",
};

const status = {
    Success: true,
    Error: false
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
const getPaystackBankList = async() => {
    try{
        //make bank list call with makeurl util by passing in banklist url, method and authorization header
        const bankListCall = await makeUrlCall(paystackBankUrl, METHODS.GET, callHeaders);
        if(bankListCall){
            const bankList = await bankListResponse(bankListCall);
            return {
                ...extractStatus(response),
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
    getPaystackBankList,
}