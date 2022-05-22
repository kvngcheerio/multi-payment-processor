
const {parseResponseValues} = require('../utils/helpers');

const bankListResponse =  (bankList) => {
    const outResponse = {
        name: "bankName",
        code: "bankCode"
    }
    return bankList.data.map((bank)=> {
        return parseResponseValues(bank, outResponse);
    });
}


module.exports = {
    bankListResponse
}