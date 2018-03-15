import React from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import axios from 'axios';

class CheckoutForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.stripe.createToken({ name: 'Clyde' }).then(({ token }) => {
      console.log('CF token:', token);
      axios.post('/api/payment', { token, amount: 333 }).then(resp => {
        console.log("RESP", resp)
      })
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form">
          <label>
            <CardElement style={{ base: { fontSize: '24px', color: 'red', '::placeholder': { color: 'yellow' } } }} />
          </label>
          <button className="orderButton">Place order</button>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);