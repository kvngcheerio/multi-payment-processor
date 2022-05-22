
const {parseResponseValues} = require('../utils/helpers');

const bankListResponse =  (bankList, outResponse) => {
    return bankList.data.map((bank)=> {
        return parseResponseValues(bank, outResponse);
    });
}


module.exports = {
    bankListResponse
}