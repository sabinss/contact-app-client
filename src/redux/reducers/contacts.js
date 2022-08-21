import {
  FETCH_CONTACTS_FAILURE,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS,
  LOADING,
  CREATE_CONTACTS_SUCCESS,
  CREATE_CONTACTS_FAILURE,
  RESET_STATE,
  LOADING_CONTACTS
} from "../types";

const initialState = {
  contacts: [],
  loading: false,
  errMsg: null
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
        errMsg: null
      };
    case RESET_STATE: {
      return { ...state, errMsg: null, loading: false };
    }
    case CREATE_CONTACTS_SUCCESS:
      return { ...state, loading: false, errMsg: null };
    case CREATE_CONTACTS_FAILURE:
      return { ...state, loading: false, errMsg: action.payload };
    default:
      return { ...state };
  }
};

export default contactReducer;
