import axios from 'axios';

import * as actionTypes from './actionTypes';

const API_KEY = 'AIzaSyBuJZb714irEJRO2PgddE8hETWXjEH3img';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    console.log(authData);
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
    if (!isSignup) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
    }
    axios.post(url, authData)
      .then(res => {
        console.log(res);
        dispatch(authSuccess(res));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err));
      });
  };
};