import { LOGIN_SUCCESS, LOGIN_FAILUER, LOADING } from "../types";

import axios from "../../api/axios";

export const login = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: LOADING, payload: true });
    const response = await axios.post("/api/auth/login", payload);
    localStorage.setItem("user", JSON.stringify(response.data));
    dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
    navigate("/dashboard");
  } catch (err) {
    const errorMessage = err?.response.data?.errors[0]?.msg;
    dispatch({
      type: LOGIN_FAILUER,
      payload: errorMessage ?? "Something went wrong"
    });
  }
};
