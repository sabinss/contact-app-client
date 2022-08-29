import {
  LOGIN,
  LOGIN_FAILUER,
  LOADING,
  REGISTER_SUCCESS,
  RESET_STATE,
  REGISTER_FAILUER
} from "../types";

const initialState = {
  isAuthenticated: false,
  errMsg: null,
  user: null,
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.paylaod,
        errMsg: null,
        loading: false
      };

    case RESET_STATE: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        errMsg: null
      };
    }

    case REGISTER_FAILUER:
      return { ...state, loading: false, errMsg: action.payload };

    case LOGIN_FAILUER:
      console.log("LOGIN_FAILUER");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        errMsg: action.payload
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };

    case LOADING:
      return { ...state, loading: action.payload };

    default:
      return { ...state };
  }
};

export default authReducer;
