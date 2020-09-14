import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe('pk_test_oh6Vt40LZ2XlQLmCnWhUrdm200Q4jay5aK');

export const bookTour = async (tourId) => {
  try {
    // 1) Get the session from the server
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
