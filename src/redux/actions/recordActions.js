import { loginSucces } from "./accountActions";
import * as actionTypes from "./actionTypes";
import { encryptRecords, decryptRecords, setEncryptionKey } from "./encryptionActions";
import { setRememberMe } from "./rememberMeActions";
import { setEditMode } from "./editModeActions";

const url = "https://europe-west1-passigndev.cloudfunctions.net/passign";

export function setRecords(records) {
  return { type: actionTypes.SET_RECORDS, payload: records }
}

export function setRecordsVisible(records) {
  return { type: actionTypes.SET_RECORDS_VISIBLE, payload: records }
}

export function getRecords(id, authorization, key, rememberMe) {
  return function (dispatch) {
    return fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        id: id,
        authorization: authorization
      }
    }).then(response => {
      if (response.ok) {
        var data = response.json();
        return data;
      } else {
        throw response.statusText;
      }
    }).then(data => {
      console.log("key " + key);
      var records = decryptRecords(data, key);
      console.log(data);
      console.log(records);
      dispatch(setRecords(records));
      dispatch(setRecordsVisible(records));
      dispatch(loginSucces({
        state: true,
        id: id,
        authorization: authorization
      }));
      dispatch(setEncryptionKey(key));
      if (rememberMe.state) {
        dispatch(setRememberMe(rememberMe));
      }
    })
      .catch(handleError);
  };
}

export function updateRecords(id, authorization, records, key) {
  return function (dispatch) {
    var raw = encryptRecords(records, key);
    var body = {records: raw};
    return fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        id: id,
        authorization: authorization
      },
      body: JSON.stringify(body)
    }).then(response => {
      if (response.ok) {
        var updated = decryptRecords(raw, key);
        dispatch(setRecords(updated));
        dispatch(setRecordsVisible(updated));
        dispatch(setEditMode(false));
      } else {
        throw response.statusText;
      }
    }).catch(handleError);
  };
}

export function handleError(error) {
  console.error("Something went wrong")
  throw error;
}