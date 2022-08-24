import { LOGIN, LOGIN_FAILUER, LOADING } from "../types";

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
        errMsg: null
      };

    case LOGIN_FAILUER:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        errMsg: action.payload
      };

    case LOADING:
      return { ...state, loading: action.payload };
    default:
      return { ...state };
  }
};

export default authReducer;
