/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import axios from "axios";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const makeRequest = async () => {
    try {
      // clear error
      setErrors(null);
      const response = await axios[method](url, body ?? {});
      console.log(response);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (err) {
      setErrors(err?.response?.data?.errors ?? "Something went wrong");
    }
  };

  return { makeRequest, errors };
};

export default useRequest;
