import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data(email or password)'
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';

    const updatedUser = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (updatedUser.data.status === 'success')
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
