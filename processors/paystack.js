const axios = require('axios');
const {paystackBankUrl, paystackVerifyAccountUrl} = require('../config/environment')
const  {generateReference} = require('../utils/helpers');


const paystackHeaders = async() => { 
    try{
    return await {
      "Content-Type": "application/json",
      Authorization: `Bearer ${paystackKey}`
    }
}
catch(e) {
    return;
}
}

const convertAmountToMinimum = (amount) => parseFloat(amount) * 100;
const convertAmountToMaximum = (amount) => parseFloat(amount) / 100;

const currency = {
    NGN: "NGN",
};

const status = {
    Success: true,
    Error: false
}

//get bank list
const getPaystackBankList = async() => {
    try{
        const header = await paystackHeaders();
        const bankList = await axios.get(paystackBankUrl, {headers:header})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error, 'Paystack axios error');
        });
        if(bankList.status === status.Success){
            return await Promise.all(bankList.data.map((bank)=> {
                return {
                    bankCode: bank.id,
                    bankName: bank.name
                }
            }));
        }
        else {
            return;
        }
    }
    catch(err){
        console.log(err, 'Paystack get bank list');
    }
}

//verify bank account
const paystackVerifyBankAccount = async(accountNumber, bankCode) => {
    try{
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

//make payment
const paystackInitiateCheckout = async(paymentObject) => {
    try{
        const header = await paystackHeaders();
        const {amount, email, callbackUrl} = paymentObject;
        const paymentReference = await generateReference(11);

        const checkout = await axios.post(paystackURL, {headers: header}, {
            "email": email,
            "amount": convertAmountToMinimum(amount),
            "paymentReference": paymentReference,
            "callback_url": callbackUrl,
            "channel": ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error, 'Paystack axios error');
            return
        });
        if(checkout.status === status.Success){
            const {authorization_url, reference} = checkout.data
            return {
                authorizationUrl: authorization_url,
                paymentReference: reference
            };
        }
        else if(checkout.data.status === status.Error){
            return;
        }
    }
    catch(error) {
        console.log(error, 'Paystack make payment error');
    }

}

//verify payment
const paystackVerifyTransaction = async(paymentReference) => {
    try{
        const header = await paystackHeaders();
        const transactionVerification = await axios.get(paystackTransactionVerificationUrl, {headers: header})
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error, 'Paystack axios error');
        });
        if(transactionVerification.status === status.Success){
            const {status} = transactionVerification.data;
                return status;
        }
        else {
            return;
        }
    }
    catch(err){
        console.log(err, 'Paystack verify transaction');
    }

}

//make transfer
const paystackMakeTransfer = async(transferObject) => {
    try{
        const header = await paystackHeaders();
        const {accountNumber, bankCode, accountName, amount} = transferObject
        const preTransferCall = await preTransfer(accountNumber, bankCode, accountName);
        const transfer = await axios.post(paystackTransferUrl, {headers: header}, {
            "source":"nuban",
            "amount": convertAmountToMinimum(amount),
            "recipient": preTransferCall.recipient_code,
            "reason": "Weekly Payout"
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error, 'Paystack axios error');
            return
        });
        if(transfer.status === status.Success){
            const {reference, amount, reason} = transfer.data;
            return {
                reference: reference,
                amount: convertAmountToMaximum(amount),
                reason: reason
            }
        }
        else {
            return;
        }
    }
    catch(error) {
        console.log(error, 'Paystack make transfer error');
    }

}

const preTransfer = async(accountNumber, bankCode, accountName) => {
    try{
        const header = await paystackHeaders();
        const transferrecipient = await axios.post(paystackPreTransferUrl, {headers: header}, {
            "type":"nuban",
            "name": accountName,
            "account_number": accountNumber,
            "bank_code": bankCode,
            "currency": currency.NGN
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error, 'Paystack axios error');
            return
        });
        if(transferrecipient.status ===  status.Success){
            return transferrecipient.data;
        }
        else {
            return;
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
    paystackMakeTransfer,
    paystackVerifyTransaction
}