import {
  LOGIN_SUCCESS,
  LOGIN_FAILUER,
  LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAILUER
} from "../types";

import axios from "../../api/axios";

export const login = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.post("/api/auth/login", payload);
    console.log("Login success", response);
    localStorage.setItem("user", JSON.stringify(response.data));
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
    navigate("/dashboard");
  } catch (err) {
    console.log("err", err.response);
    const errorMessage = err.response?.data?.error?.[0].msg;

    dispatch({
      type: LOGIN_FAILUER,
      payload: errorMessage ?? "Something went wrong"
    });
  }
};

export const signup = (payload, callback) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.post("/api/auth/signup", payload);
    console.log("response", response);
    localStorage.setItem("user", JSON.stringify(response.data));
    dispatch({ type: REGISTER_SUCCESS, payload: response.data.user });
    callback();
  } catch (err) {
    const errorMessage = err?.response.data?.errors[0]?.msg;
    dispatch({
      type: REGISTER_FAILUER,
      payload: errorMessage ?? "Something went wrong"
    });
  }
};
