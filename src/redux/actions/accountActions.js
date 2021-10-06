import * as actionTypes from "./actionTypes";

const url = "https://europe-west1-passigndev.cloudfunctions.net/passign";

export function createAccountSuccess(id) {
  return { type: actionTypes.CREATE_ACCOUNT_SUCCESS, payload: id }
}

export function createAccount(authorization) {
  return function (dispatch) {
    return fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: authorization
      }
    })
      .then(response => {
        if (response.ok) {
          var data = response.text();
          return data;
        } else {
          throw "Account could not be created. Please try again";
        }
      }).then(data => dispatch(createAccountSuccess(data)))
      .catch(handleError);
  };
}

export function loginSucces(loginState) {
  return { type: actionTypes.LOGIN_SUCCES, payload: loginState }
}

export function handleError(error) {
  console.error(error)
}

