import {
  FETCH_CONTACTS,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
  CREATE_CONTACTS_SUCCESS,
  CREATE_CONTACTS_FAILURE,
  LOADING_CONTACTS,
  DELETE_CONTACT,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAILURE,
  CREATE_CONTACT,
  GET_CONTACT_BY_ID_FAILURE,
  GET_CONTACT_BY_ID,
  GET_CONTACT_BY_ID_SUCCESS,
  UPDATE_CONTACT,
  UPDATE_CONTACTS_SUCCESS,
  UPDATE_CONTACTS_FAILURE,
  MAKE_FAVOURITE_CONTACT,
  UPDATE_PROFILE_PIC
} from "../types";

import axios from "../../api/axios";

export const fetchContacts =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOADING_CONTACTS, payload: true });
      const response = await axios.get(`/api/contacts?page=${page}`);
      console.log("limit", response.data.limit);
      dispatch({
        type: FETCH_CONTACTS_SUCCESS,
        payload: {
          contacts: response.data.contacts,
          limit: response.data.limit,
          totalRecords: response.data.totalRecord
        }
      });
    } catch (err) {
      dispatch({ type: FETCH_CONTACTS_FAILURE });
    }
  };

export const nextPage = () => (dispatch) => {
  dispatch({ type: "NEXT_PAGE" });
};

export const previouspage = () => (dispatch) => {
  dispatch({ type: "PREVIOUS_PAGE" });
};

export const createContact = (payload, callback) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CONTACT });
    await axios.post("/api/contacts", payload);
    const response = await axios.get("/api/contacts");
    dispatch({
      type: CREATE_CONTACTS_SUCCESS,
      payload: response.data.contacts
    });
    callback(true);
  } catch (err) {
    dispatch({
      type: CREATE_CONTACTS_FAILURE,
      payload: err?.response?.data?.msg ?? "Something went wrong"
    });
  }
};

export const updateContact = (payload, callback) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CONTACT });
    await axios.post(`/api/contacts/${payload._id}`, payload);
    const response = await axios.get("/api/contacts");
    dispatch({
      type: UPDATE_CONTACTS_SUCCESS,
      payload: payload
    });
    callback(true);
  } catch (err) {
    dispatch({
      type: UPDATE_CONTACTS_FAILURE,
      payload: err?.response?.data?.msg ?? "Something went wrong"
    });
  }
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CONTACT, payload: true });
    await axios.delete(`/api/contacts/${id}`);
    dispatch({ type: DELETE_CONTACT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_CONTACT_FAILURE, payload: error });
  }
};

export const getContactById = (id, callback) => async (dispatch) => {
  try {
    dispatch({ type: GET_CONTACT_BY_ID, payload: true });
    const {
      data: { user }
    } = await axios.get(`/api/contacts/${id}`);
    dispatch({ type: GET_CONTACT_BY_ID_SUCCESS, payload: user });
  } catch (error) {
    dispatch({
      type: GET_CONTACT_BY_ID_FAILURE,
      payload: error ?? "Something went wrong"
    });
  }
};

export const makeFavouriteContact = (id, isFavourite) => async (dispatch) => {
  try {
    console.log("markFavourite", isFavourite);
    await axios.post(`/api/contacts/favourite/${id}`, {
      isFavourite
    });
    const response = await axios.get("/api/contacts");
    dispatch({
      type: MAKE_FAVOURITE_CONTACT,
      payload: response.data.contacts
    });
  } catch (error) {}
};

export const updateProfilePic =
  (id, profileUrl, callback) => async (dispatch) => {
    try {
      const response = await axios.put(`/api/contacts/profile/${id}`, {
        profileUrl
      });
      callback();
      dispatch({
        type: UPDATE_PROFILE_PIC,
        payload: { id, profileUrl }
      });
    } catch (error) {
      callback();
    }
  };
