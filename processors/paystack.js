const {paystackBankUrl, paystackSecretKey, paystackVerifyAccountUrl} = require('../config/environment')
const {extractResponseProperty} = require('../utils/helpers');
const {makeUrlCallWithoutData} = require('../utils/configFunctions');
const {bankListResponse, verifyAccountResponse} = require('../config/response')


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
        const verifyAccountCall = await makeUrlCallWithoutData(callObject);
        if(verifyAccountCall){
            const outResponse = {
                account_name: "accountName",
                account_number: "accountNumber"
            }
            const accountDetail = await verifyAccountResponse(verifyAccountCall.data, outResponse);
            return {
                ...extractStatus(verifyAccountCall),
                accountDetail: accountDetail
            };  
        }
        
        else {
            throw 'invalid call';
        }
    }
    catch(err){
        throw 'account verification error';
    }
}

//verify bank account
const paystackVerifyBankAccount = async(accountNumber, bankCode) => {
    try{
        const callObject = {
            callUrl:`${paystackVerifyAccountUrl}?account_number=${accountNumber}&bank_code=${bankCode}`, 
            callMethod:METHODS.GET, 
            callHeaders:callHeaders, 
            callParams
        }
        const bankListCall = await makeUrlCallWithoutData(callObject);
    const url = `${paystackVerifyAccountUrl}?account_number=${accountNumber}&bank_code=${bankCode}`;
    const header = await paystackHeaders();
    const accountDetail = await axios.get(url, {headers:header}).then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.log(error, 'Paystack axios error')
    });
    if(accountDetail && accountDetail.status == true){
        const {account_number, account_name} = accountDetail.data
        return {
            bankCode: bankCode,
            accountNumber: account_number,
            accountName: account_name
        }
    }
    else {
        return;
    }
}
 catch(error){
     console.log(error, 'Paystack verify bank account error');
    };


}


module.exports = {
    getPaystackBankList,
    paystackVerifyBankAccount,
}