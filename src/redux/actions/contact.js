import {
  FETCH_CONTACTS,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
  CREATE_CONTACTS_SUCCESS,
  CREATE_CONTACTS_FAILURE,
  LOADING_CONTACTS
} from "../types";

import axios from "../../api/axios";

export const fetchContacts = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CONTACTS, payload: true });
    const response = await axios.get("/api/contacts");
    console.log("response", response);
    dispatch({ type: FETCH_CONTACTS_SUCCESS, payload: response.data.contacts });
    // navigate("/dashboard");
  } catch (err) {
    console.log("error", err);
    dispatch({ type: FETCH_CONTACTS_FAILURE });
  }
};

export const createContact = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_CONTACTS, payload: true });
    await axios.post("/api/contacts", payload);
    navigate("/dashboard");

    dispatch({
      type: CREATE_CONTACTS_SUCCESS
    });
  } catch (err) {
    console.log("eerrrr", err?.response?.data?.msg);
    dispatch({
      type: CREATE_CONTACTS_FAILURE,
      payload: err?.response?.data?.msg ?? "Something went wrong"
    });
  }
};
