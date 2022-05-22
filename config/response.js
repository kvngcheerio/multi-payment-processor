
const {parseResponseValues} = require('../utils/helpers');

const bankListResponse =  (bankList, outResponse) => {
    return bankList.map((bank)=> {
        return parseResponseValues(bank, outResponse);
    });
}


const verifyAccountResponse = (verification, outResponse) => {
    return parseResponseValues(verification, outResponse);
}


const checkoutResponse = (data, outResponse) => {
    return parseResponseValues(data, outResponse);
}



module.exports = {
    bankListResponse,
    verifyAccountResponse,
    checkoutResponse,
}