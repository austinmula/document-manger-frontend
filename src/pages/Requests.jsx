import React from "react";

import UsersContainer from "../components/users/UsersContainer";
import ConfirmationModalContextProvider from "../context/ConfirmationModalContext";

export default function Requests() {
  return (
    <div>
      <ConfirmationModalContextProvider>
        <UsersContainer />
      </ConfirmationModalContextProvider>
    </div>
  );
}
