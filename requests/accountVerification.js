const { processor } = require("../config/environment");
const { paystack, flutterwave } = require("../processors");

const verifyBankAccount = async ({
  accountNumber: accountNumber,
  bankCode: bankCode,
}) => {
  try {
    if (!processor) throw "Please enter PROCESSOR in env file";
    switch (processor) {
      case "PAYSTACK":
        return paystack.paystackVerifyBankAccount(accountNumber, bankCode);
      case "FLUTTERWAVE":
        return flutterwave.flutterwaveVerifyBankAccount(
          accountNumber,
          bankCode
        );
    }
  } catch (e) {
    throw "verify bank account failed";
  }
};

module.exports = {
  verifyBankAccount,
};
