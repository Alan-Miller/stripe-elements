import React from 'react';
import { injectStripe, PaymentRequestButtonElement } from 'react-stripe-elements';

class PaymentRequestForm extends React.Component {
  constructor(props) {
    super(props);

    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Total',
        amount: 1000,
      },
    });

    paymentRequest.on('token', ({ complete, token, ...data }) => {
      console.log('PRF token: ', token);
      console.log('customer data: ', data);
      complete('success');
    });

    paymentRequest.canMakePayment().then(result => {
      this.setState({ canMakePayment: !!result });
    });

    this.state = {
      canMakePayment: false,
      paymentRequest,
    };
  }

  render() {
    return this.state.canMakePayment ? (
      <PaymentRequestButtonElement
        paymentRequest={this.state.paymentRequest}
        className="PaymentRequestButton"
        style={{ paymentRequestButton: { theme: 'light', height: '64px' } }}
      />
    ) : null;
  }
}
export default injectStripe(PaymentRequestForm);