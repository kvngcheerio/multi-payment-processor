const { processor } = require("../config/environment");
const { paystack, flutterwave } = require("../processors");

const initiateCheckout = async ({
  emailAddress: emailAddress,
  amount: amount,
  callbackUrl: callbackUrl,
  others,
}) => {
  try {
    if (!processor) throw "Please enter PROCESSOR in env file";
    switch (processor) {
      case "PAYSTACK":
        return paystack.paystackInitiateCheckout(
          emailAddress,
          amount,
          callbackUrl
        );
      case "FLUTTERWAVE":
        return flutterwave.flutterwaveInitiateCheckout(
          emailAddress,
          amount,
          callbackUrl,
          others
        );
    }
  } catch (e) {
    throw "intiating checkout failed";
  }
};

const verifyTransaction = async ({ paymentReference: paymentReference }) => {
  try {
    if (!processor) throw "Please enter PROCESSOR in env file";
    switch (processor) {
      case "PAYSTACK":
        return paystack.paystackVerifyTransaction(paymentReference);
      case "FLUTTERWAVE":
        return flutterwave.flutterwaveVerifyTransaction(paymentReference);
    }
  } catch (e) {
    throw "intiating checkout failed";
  }
};

module.exports = {
  initiateCheckout,
  verifyTransaction,
};
