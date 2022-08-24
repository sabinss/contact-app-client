import {
  FETCH_CONTACTS_FAILURE,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS,
  LOADING,
  CREATE_CONTACTS_SUCCESS,
  CREATE_CONTACTS_FAILURE,
  RESET_STATE,
  LOADING_CONTACTS,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT,
  CREATE_CONTACT
} from "../types";

const initialState = {
  contacts: [],
  loading: false,
  errMsg: null,

  creatingContact: false,
  createContactSuccess: false,

  deleteContact: false,
  deleteContactSuccess: false
};

const contactReducer = (state = initialState, action) => {
  console.log("createREducer", action);
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, contacts: action.payload };

    case LOADING_CONTACTS:
      return { ...state, loading: action.payload };

    case FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        contacts: action.payload,
        errMsg: null,
        deleteContactSuccess: false,
        deleteContact: false
      };
    case RESET_STATE: {
      return {
        ...state,
        errMsg: null,
        loading: false,
        deleteContact: false,
        deleteContactSuccess: false,
        creatingContact: false,
        createContactSuccess: false
      };
    }

    case CREATE_CONTACT: {
      return { ...state, creatingContact: true, createContactSuccess: false };
    }
    case CREATE_CONTACTS_SUCCESS:
      console.log("contacts reducer", state.contacts);
      return {
        ...state,
        loading: false,
        errMsg: null,
        creatingContact: false,
        createContactSuccess: true,
        contacts: action.payload
      };
    case CREATE_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        errMsg: action.payload,
        creatingContact: false,
        createContactSuccess: false
      };
    case DELETE_CONTACT:
      return { ...state, deleteContact: true, deleteContactSuccess: false };
    case DELETE_CONTACT_SUCCESS:
      console.log("action.payload", action.payload);
      const updatedContactList = state.contacts.filter(
        (contact) => contact._id !== action.payload
      );

      return {
        ...state,
        contacts: [...updatedContactList],
        deleteContact: false,
        deleteContactSuccess: true
      };

    default:
      return { ...state };
  }
};

export default contactReducer;
