const {paystackBankUrl, paystackSecretKey, paystackVerifyAccountUrl, paystackURL, paystackTransactionVerificationUrl, paystackPreTransferUrl, paystackTransferUrl} = require('../config/environment')
const {extractResponseProperty, convertAmount, reduceAmount} = require('../utils/helpers');
const {makeUrlCallWithoutData, makeUrlCallWithData} = require('../utils/configFunctions');
const {bankListResponse, verifyAccountResponse, checkoutResponse, transferResponse} = require('../config/response')


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

const CURRENCY = {
    NGN:'NGN'
}

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
            throw 'Unable to reach paystack bank list service';
        }
    }
    catch(err){
        throw `Unable to reach paystack bank list service - ${err}`;
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
        throw 'Paystack verify bank account error';
    }
}
 catch(error){
     throw `Paystack verify bank account error - ${error}`;
    };


}

//make payment
const paystackInitiateCheckout = async(emailAddress, amount, callbackUrl) => {
    try {
        const callObject = {
            callUrl: paystackURL,
            callMethod: METHODS.POST,
            callHeaders: callHeaders,
            callRequest:{email:emailAddress, amount: convertAmount(amount), callback_url:callbackUrl}
        }
        const checkoutCall = await makeUrlCallWithData(callObject);
        if(checkoutCall){
            const outResponse = {
                authorization_url:'paymentUrl',
                reference:'paymentReference'
            }

            const checkoutDetail = await checkoutResponse(checkoutCall.data, outResponse);
            return {
                ...extractStatus(checkoutCall),
                checkout:checkoutDetail
            };  
        }
        else {
            throw 'Unable to create paystack payment link'
        }
    }
    catch(e){
        throw `Unable to create paystack payment link - ${e}`;
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
            const transactionVerification = await checkoutResponse(transactionVerificationCall.data, outResponse);
            return {
                ...extractStatus(transactionVerificationCall),
                transaction: {...transactionVerification, paymentAmount:reduceAmount(transactionVerification.paymentAmount)}
            };  
        }
        
        else {
            throw 'Unable to verify transaction via paystack';
        }
    }
    catch(err){
        throw `Unable to verify transaction via paystack - ${err}`
    }

}

//make transfer
const paystackMakeTransfer = async(accountNumber, bankCode, amount, description) => {
    try{
        const preTransferCall = await preTransfer(accountNumber, bankCode);

        const callObject = {
            callUrl: paystackTransferUrl,
            callMethod: METHODS.POST,
            callHeaders: callHeaders,
            callRequest:{"source": "balance", amount: convertAmount(amount), recipient:preTransferCall.preTransfer.recipientCode, reason:description}
        }
        const transferCall = await makeUrlCallWithData(callObject);

        if(transferCall){
            const outResponse = {
                reference:'transferReference',
                status: "transferStatus",
                amount:"transferAmount",
            }

            const transfer = await transferResponse(transferCall.data, outResponse);
            return {
                ...extractStatus(transfer),
                transaction:{...transfer, accountNumber:preTransferCall.preTransfer.details.account_number, bankCode:preTransferCall.preTransfer.details.bank_code, fullName:preTransferCall.preTransfer.details.account_name, currency: CURRENCY.NGN, amount:reduceAmount(transfer.transferAmount)}
            };  
        }
        else {
            throw 'Unable to initiate transfer via paystack';
        }
    }
    catch(error) {
        throw `Unable to initiate transfer via paystack ${err}`
    }

}

const preTransfer = async(accountNumber, bankCode) => {
    try{
        const verifyAccountCall = await paystackVerifyBankAccount(accountNumber, bankCode)
        const callObject = {
            callUrl: paystackPreTransferUrl,
            callMethod: METHODS.POST,
            callHeaders: callHeaders,
            callRequest:{type:'nuban', account_number:accountNumber, bank_code:bankCode, name:verifyAccountCall.accountDetail.accountName, currency:CURRENCY.NGN}
        }
        const preTransferCall = await makeUrlCallWithData(callObject);

        if(preTransferCall){
            const outResponse = {
                recipient_code:'recipientCode',
                details:'details'
            }

            const preTransfer = await transferResponse(preTransferCall.data, outResponse);
            return {
                ...extractStatus(preTransfer),
                preTransfer:{...preTransfer}
            };  
        }
    }
    catch(error) {
        console.log(error, 'Paystack pre transfer error');
    }
}





module.exports = {
    getPaystackBankList,
    paystackVerifyBankAccount,
    paystackInitiateCheckout,
    paystackVerifyTransaction,
    paystackMakeTransfer
}