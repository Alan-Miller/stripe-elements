# Stripe Elements

## Overview

* User completes form, sending information to Stripe.
* Stripe sends back token.
* POST request is sent with token id to server.
* Endpoint function creates charge.
* Response comes back (charge or error).

## **1. Sign up for Stripe account**
- The account is free. If you are just testing, do not activate the account. You can test payments with the test credit card number: 4242-4242-4242-4242.
- In the API settings, copy the Publishable Key and the Secret Key.

## **2. Protect your keys**
- Store the Publishable Key and the Secret Key in a file that is .gitignored, like an .env file or a config.js file.
- React only allows front end environment variables if they start with "REACT_APP_". Our Publishable Key will be used in our React front end, so name it something like REACT_APP_STRIPE_PUBLIC_KEY.
- The Secret Key will be used on the back end, so it does not need "REACT_APP_". Ours will be called STRIPE_PRIVATE_KEY here.

## **3. Install** 
#### **Install `react-stripe-elements`**: 
```sh
npm install react-stripe-elements
```


## **4. Front end**

+++ Finish these notes

## **5. Back end**

#### **Require `stripe`**
- Require `stripe`.
- Invoke with your Secret Key.
  ```js
  const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
  ```

#### **Write POST endpoint function**
- Stripe expects the amount to be in cents. Depending on your app, you may need to convert the amount format using something like the pennyConverter in the `server` folder here. This might be true if your users enter the amount themselves, some typing whole numbers and others decimals. Because this app involves a simple button press and the amount is already in cents, no conversion is needed.
- Invoke Stripe's `create()` method to create a charge, passing in a configuration objection with `amount`, `currency`, `source`, and `description` properties.
- The `source` property takes the `id` value on the token we sent in the request body.
- The `create()` method takes a callback. Handle the error parameter.
- This example sends the entire charge back to the front, where our app logs it to the console.

  ```js
  app.post('/api/payment', (req, res, next) => {
    
    // If needed, convert req.body.amount to pennies

    const charge = stripe.charges.create(
      {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd',
        description: 'Stripe test charge'
      },
      function(err, charge) {
          if (err) return res.sendStatus(500);
          else return res.sendStatus(200);
      }
    );
  });
  ```

---

## Notes

  - [Stripe Elements docs](https://stripe.com/docs/stripe-js/elements/quickstart)
  - [`react-stripe-elements` NPM docs](https://github.com/stripe/react-stripe-elements)
  