const { processor } = require("../config/environment");
const { flutterwave, paystack } = require("../processors");

const initiateTransfer = async ({
  bankCode: bankCode,
  accountNumber: accountNumber,
  amount: amount,
  currency: currency,
  narration: narration,
  callbackUrl: callbackUrl,
  others,
}) => {
  try {
    if (!processor) throw "Please enter PROCESSOR in env file";
    switch (processor) {
      case "FLUTTERWAVE":
        return flutterwave.flutterwaveInitiateTransfer(
          bankCode,
          accountNumber,
          amount,
          currency,
          narration,
          callbackUrl,
          others
        );
      case "PAYSTACK":
        return paystack.paystackMakeTransfer(
          accountNumber,
          bankCode,
          amount,
          narration
        );
    }
  } catch (e) {
    throw "intiating transfer failed";
  }
};

module.exports = {
  initiateTransfer,
};
