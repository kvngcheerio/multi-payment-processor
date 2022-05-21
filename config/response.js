
const {parseResponseValues} = require('../utils/helpers');

const bankListResponse =  (bankList) => {
    const outResponse = {
        bankName: "name",
        bankCode: "code"
    }
    return await Promise.all(bankList.data.map((bank)=> {
        return parseResponseValues(bank, outResponse);
    }))
}


module.export = {
    bankListResponse
}