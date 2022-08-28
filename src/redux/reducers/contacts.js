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
  UPDATE_CONTACTS_FAILURE,
  UPDATE_CONTACT,
  MAKE_FAVOURITE_CONTACT,
  UPDATE_PROFILE_PIC
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

  updateContact: false,
  updateContactSuccess: false,
  updateContactFailure: false,

  //for pagination
  limit: 5,
  totalRecord: 0,
  page: 1
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, contacts: action.payload };

    case LOADING_CONTACTS:
      return { ...state, loading: action.payload };

    case "NEXT_PAGE":
      const nPages = Math.ceil(state.totalRecords / state.limit);
      const nextPage = state.page >= nPages ? 1 : state.page + 1;
      return { ...state, page: nextPage };

    case "PREVIOUS_PAGE":
      const previousPage = state.page <= 0 ? 0 : state.page - 1;
      return { ...state, page: previousPage };

    case FETCH_CONTACTS_SUCCESS:
      console.log("success", action.payload);
      const { limit, totalRecords } = action.payload;
      return {
        ...state,
        loading: false,
        contacts: action.payload.contacts.map((contact) => ({
          ...contact,
          isFavourite: contact?.isFavourite ? contact?.isFavourite : false
        })),
        errMsg: null,
        limit,
        totalRecords,
        nPages: Math.ceil(totalRecords / limit),
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
        createContactSuccess: false,
        updateContact: false,
        updateContactSuccess: false,
        updateContactFailure: null
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
    case UPDATE_CONTACT: {
      return {
        ...state,
        updateContact: true,
        updateContactSuccess: false,
        updateContactFailure: null
      };
    }
    case UPDATE_CONTACTS_SUCCESS: {
      return {
        ...state,
        contact: action.payload,
        updateContact: false,
        updateContactSuccess: true,
        updateContactFailure: null
      };
    }

    case UPDATE_CONTACTS_FAILURE: {
      return {
        ...state,
        updateContact: false,
        updateContactSuccess: false,
        updateContactFailure: true
      };
    }

    case MAKE_FAVOURITE_CONTACT: {
      // const cloneContacts = [...state.contacts];
      // const index = state.contacts.findIndex(
      //   (contact) => contact._id === action.payload._id
      // );
      console.log("index", action.payload);
      return {
        ...state,
        contacts: [...action.payload]
      };
    }
    case UPDATE_PROFILE_PIC: {
      return {
        ...state,
        contacts: [...action.payload]
      };
    }
    default:
      return { ...state };
  }
};

export default contactReducer;
