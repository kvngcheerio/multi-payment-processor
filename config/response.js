
const {parseResponseValues} = require('../utils/helpers');

const bankListResponse =  (bankList, outResponse) => {
    return bankList.map((bank)=> {
        return parseResponseValues(bank, outResponse);
    });
}



module.exports = {
    bankListResponse
}