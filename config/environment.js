module.exports = {
    //user configurations
    processor: process.env.PROCESSOR || 'PAYSTACK',
    paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
    paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY,
    flutterwaveSecretKey: process.env.FLUTTERWAVE_SECRET_KEY,
    monnifySecretKey: process.env.MONNIFY_SECRET_KEY,
    monnifyApiKey: process.env.MONNIFY_API_KEY,


    //system configurations
    //paystack
    paystackURL: 'https://api.paystack.co/transaction/initialize',
    paystackBankUrl: 'https://api.paystack.co/bank',
    paystackVerifyAccountUrl: 'https://api.paystack.co/bank/resolve',
    paystackPreTransferUrl: 'https://api.paystack.co/transferrecipient',
    paystackTransferUrl: 'https://api.paystack.co/transfer',
    paystackTransactionVerificationUrl: 'https://api.paystack.co/transaction/verify',

    //flutterwave
    flutterwavebeneficiaryURL: 'https://api.flutterwave.com/v3/beneficiaries',
    flutterwavepaymentURL: 'https://api.flutterwave.com/v3/payments',
    flutterwaveverifyURL: 'https://api.flutterwave.com/v3/transactions/',
    flutterwavebankURL: 'https://api.flutterwave.com/v3/banks/NG',
    flutterwaveaccountURL: 'https://api.flutterwave.com/v3/accounts/resolve',


    //monnify
    monnifyLoginUrl:'https://sandbox.monnify.com/api/v1/auth/login',
    monnifyBankUrl: 'https://sandbox.monnify.com/api/v1/banks',


}