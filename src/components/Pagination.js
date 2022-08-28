import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useDispatch, useSelector } from "react-redux";

export const Pagination = () => {
  const { nPages, page } = useSelector((state) => state.contactReducer);
  const dispatch = useDispatch();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30
      }}
    >
      <Button
        variant="primary"
        style={{ backgroundColor: "#150947" }}
        onClick={() => dispatch({ type: "PREVIOUS_PAGE" })}
      >
        Previous Page
      </Button>

      <p
        style={{
          marginLeft: 10,
          marginRight: 10,
          textAlign: "center",
          lineHeight: 3
        }}
      >
        {page} of {nPages}
      </p>
      <Button
        variant="primary"
        onClick={() => dispatch({ type: "NEXT_PAGE" })}
        style={{ backgroundColor: "#150947" }}
      >
        Next Page
      </Button>
    </div>
  );
};
