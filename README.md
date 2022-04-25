# MPP

MPP is a [Javascript] package to work with all payment processors as one in an asynchronous environment. MPP gives the ability to switch between processors without worrying about breaking codes

## Installation
```bash
npm i multi-payment-processor
```

## Usage
Open your .env file and add your public key, secret key, merchant email and selected processor like so:

```js
PROCESSOR=PAYSTACK|FLUTTERWAVE|MONNIFY
PAYSTACK_SECRET_KEY=xxxxxxxxxxxxx
PAYSTACK_PUBLIC_KEY=xxxxxxxxxxxxx
FLUTTERWAVE_SECRET_KEY=xxxxxxxxxxxxx
FLUTTERWAVE_PUBLIC_KEY=xxxxxxxxxxxxx
MONNIFY_SECRET_KEY=xxxxxxxxxxxxx
MONNIFY_PUBLIC_KEY=xxxxxxxxxxxxx
```
*If you are using a hosting service like heroku, ensure to add the above details to your configuration variables.*

```js
const mpp = new MPP()
```

### Available integrations

* getBankList
    - `returns`: array
