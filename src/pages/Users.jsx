import React from "react";
import AllPermissions from "../components/roles-perms/AllPermissions";
import AllUserRoles from "../components/roles-perms/AllUserRoles";
import ConfirmationModalContextProvider from "../context/ConfirmationModalContext";

export default function Users() {
  return (
    <div>
      <ConfirmationModalContextProvider>
        <AllUserRoles />
        <div className="mt-6" />
        <AllPermissions />
      </ConfirmationModalContextProvider>
    </div>
  );
}
