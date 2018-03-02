import React, { Component } from 'react';
import './App.css';
import { StripeProvider, Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';
// import InjectedPaymentRequestForm from './PaymentRequestForm';

export default class App extends Component {

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">Stripe Elements</h1>
        </header>

        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}>
          <Elements>
            <div>
              <InjectedCheckoutForm />
            </div>
          </Elements>
        </StripeProvider>

      </div>
    );
  }
}