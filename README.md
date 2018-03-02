# Stripe Elements

## Overview

* User clicks Pay With Card button.
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
#### **Install `stripe` and `react-stripe-checkout`**: 
```sh
npm install stripe react-stripe-checkout
```


## **4. Front end**

#### **Import `react-stripe-checkout`**
  ```js
  import StripeCheckout from 'react-stripe-checkout';
  ```

#### **Render Stripe Checkout**
- In the `stripeKey` prop, pass in the Publishable Key stored in the .env file.
- Pass in a charge amount to the `amount` prop. In the App.js file, we are passing in 999 cents ($9.99) every time, but the example below shows how you might store the amount in a variable which you then pass in.
- In the `token` prop, pass in a method that will be called when the used click the Pay button. This method will accept a token from Stripe and the post a payment.
  ```js
  <StripeCheckout
    token={this.onToken}
    stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
    amount={this.state.amount}
  />
  ```

#### **Write POST method**
- Write a method to accept a token from Stripe.
- Use axios to make a POST request to our server, passing back the token and the payment amount in the request body.
- Notice the two console.logs here. When the user clicks the button and enters information for a payment, two logs should appear in the console. The first is the token created after the used finished with the Stripe form. The second log appears a few moments later after the charge is approved; this charge is logged in the console when it gets back from our server.
  ```js
  onToken = token => {
    console.log('token', token);
    token.card = void 0;
    const { amount } = this.state
    axios.post('/api/payment', { token, amount })
      .then(charge => { console.log('charge response', charge.data) }););
  }
  ```

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

  - This demo was based on [Joe Blank's demo](https://github.com/joeblank/react-stripe).
  - [Stripe Checkout (simple) docs](https://stripe.com/docs/checkout#integration-simple)
  - [`react-stripe-elements` NPM docs](https://github.com/stripe/react-stripe-elements#setting-up-your-payment-form-injectstripe)
  