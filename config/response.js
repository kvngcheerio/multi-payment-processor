
const {parseResponseValues} = require('../utils/helpers');

const bankListResponse =  (bankList, outResponse) => {
    return bankList.map((bank)=> {
        return parseResponseValues(bank, outResponse);
    });
}


const verifyAccountResponse = (verification, outResponse) => {
    return parseResponseValues(verification, outResponse);
}


module.exports = {
    bankListResponse,
    verifyAccountResponse
}