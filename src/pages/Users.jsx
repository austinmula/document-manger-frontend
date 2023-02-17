import React from "react";

import UsersContainer from "../components/users/UsersContainer";
import ConfirmationModalContextProvider from "../context/ConfirmationModalContext";

export default function Users() {
  return (
    <div>
      <ConfirmationModalContextProvider>
        <UsersContainer />
      </ConfirmationModalContextProvider>
    </div>
  );
}
