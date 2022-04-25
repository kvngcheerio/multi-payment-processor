module.exports = {
    //user configurations
    processor: process.env.PROCESSOR || 'PAYSTACK',
    paystackSecretKey: process.env.PAYSTACK_SECRET_KEY,
    paystackPublicKey: process.env.PAYSTACK_PUBLIC_KEY,


    //system configurations
    paystackURL: process.env.PAYSTACK_URL || 'https://api.paystack.co/transaction/initialize',
    paystackBankUrl: process.env.PAYSTACK_BANK_URL || 'https://api.paystack.co/bank',
    paystackVerifyAccountUrl: process.env.PAYSTACK_VERIFY_ACCOUNT || 'https://api.paystack.co/bank/resolve',
    paystackPreTransferUrl: process.env.PAYSTACK_PRETRANSFER_URL || 'https://api.paystack.co/transferrecipient',
    paystackTransferUrl: process.env.PAYSTACK_TRANSFER_URL || 'https://api.paystack.co/transfer',
    paystackTransactionVerificationUrl: process.env.PAYSTACK_TRANSACTION_VERIFCATION_URL || 'https://api.paystack.co/transaction/verification',
}