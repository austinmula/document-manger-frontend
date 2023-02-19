import React from "react";
import RequestsContainer from "../components/requests/RequestsContainer";
import ConfirmationModalContextProvider from "../context/ConfirmationModalContext";

export default function Requests() {
  return (
    <div>
      <ConfirmationModalContextProvider>
        <RequestsContainer />
      </ConfirmationModalContextProvider>
    </div>
  );
}
