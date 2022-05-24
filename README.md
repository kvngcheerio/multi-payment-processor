# Multi-Payment-Processor

Multi-Payment-Processor is a [Javascript] package to work with all payment processors as one in an asynchronous environment. Multi-Payment-Processor gives the ability to switch between processors without worrying about breaking codes

## Installation
```bash
npm i multi-payment-processor
```

## Usage
Open your .env file and add your public key, secret key and selected processor like so:

```js
PROCESSOR=PAYSTACK|FLUTTERWAVE|MONNIFY
PAYSTACK_SECRET_KEY=xxxxxxxxxxxxx
FLUTTERWAVE_SECRET_KEY=xxxxxxxxxxxxx
MONNIFY_SECRET_KEY=xxxxxxxxxxxxx
MONNIFY_API_KEY=xxxxxxxxxxxxx
```
*If you are using a hosting service like heroku, ensure to add the above details to your configuration variables.*


```js
const mpp = require('multi-payment-processor');
```

To Get All Banks
```js
const mpp = await mpp().getAllBanks();
```

To Verify Bank Account
```js

const accountObject = {
accountNumber:request.body.accountNumber,
bankCode:request.body.bankCode
}

const bankAccount = await mpp.verifyBankAccount(accountObject);
```

To Initiate Checkout
```js
const paymentObject = {
emailAddress: request.body.emailAddress,
amount: request.body.amount,
callbackUrl: request.body.callbackUrl
}

const payment = await mpp.initiateCheckout(paymentObject);
```

To Verify Payment
```js
const verifiedPayment = await mpp.verifyTransaction({paymentReference:request.body.paymentReference});
```


### Available integrations

* Get BankList
* Verify Bank Account
* Initiate Checkout
* Verify Payment
