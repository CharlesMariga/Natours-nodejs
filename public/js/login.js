import axios from 'axios';
import { showAlert } from './alerts';

const loadAllTour = (res, alertMsg) => {
  if (res.data.status === 'success') {
    showAlert('success', alertMsg);
    window.setTimeout(() => {
      location.assign('/');
    }, 1500);
  }
};

export const signUp = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/users/signup`,
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    loadAllTour(res, 'Signed up successFully!');
  } catch (err) {
    showAlert('error', err.response.data.message || 'User already exists!');
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/users/login`,
      data: {
        email,
        password,
      },
    });

    loadAllTour(res, 'Logged in successFully!');
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        loadAllTour(res, 'Logged out successFully!');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again!');
  }
};
