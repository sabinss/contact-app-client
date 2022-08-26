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
  CREATE_CONTACT,
  GET_CONTACT_BY_ID,
  GET_CONTACT_BY_ID_SUCCESS,
  GET_CONTACT_BY_ID_FAILURE,
  UPDATE_CONTACTS_SUCCESS,
  UPDATE_CONTACTS_FAILURE
} from "../types";

const initialState = {
  contacts: [],
  loading: false,
  errMsg: null,

  creatingContact: false,
  createContactSuccess: false,

  deleteContact: false,
  deleteContactSuccess: false,

  contact: {},
  contactById: false,
  contactByIdSuccess: false,
  contactByIdFailure: null,

  updateContactSuccess: false,
  updateContactFailure: false
};

const contactReducer = (state = initialState, action) => {
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
      const updatedContactList = state.contacts.filter(
        (contact) => contact._id !== action.payload
      );

      return {
        ...state,
        contacts: [...updatedContactList],
        deleteContact: false,
        deleteContactSuccess: true
      };
    case GET_CONTACT_BY_ID: {
      return {
        ...state,
        contact: {},
        contactById: true,
        contactByIdSuccess: false,
        contactByIdFailure: null
      };
    }
    case GET_CONTACT_BY_ID_SUCCESS: {
      return {
        ...state,
        contact: action.payload,
        contactById: false,
        contactByIdSuccess: true,
        contactByIdFailure: null
      };
    }
    case GET_CONTACT_BY_ID_FAILURE: {
      return {
        ...state,
        contact: {},
        contactById: false,
        contactByIdSuccess: false,
        contactByIdFailure: action.payload
      };
    }

    case UPDATE_CONTACTS_SUCCESS: {
      return {
        ...state,
        updateContactSuccess: true,
        updateContactFailure: null
      };
    }

    case UPDATE_CONTACTS_FAILURE: {
      return {
        ...state,
        updateContactSuccess: false,
        updateContactFailure: true
      };
    }
    default:
      return { ...state };
  }
};

export default contactReducer;
