import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deletepermission,
  fetchallpermissions,
  reset,
} from "../../features/permissions/permissionSlice";

import Card from "./Card";

export default function AllUserRoles() {
  const dispatch = useDispatch();
  const { permissions } = useSelector((state) => state.permissions);

  useEffect(() => {
    dispatch(fetchallpermissions());

    return () => reset();
  }, []);

  const remove = async (id) => {
    await dispatch(deletepermission(id));
  };

  return (
    <>
      <h2 className="text-xl font-bold">All Permissions</h2>
      <div className="mt-4 grid gap-2 grid-cols-1 md:grid-cols-2 overflow-hidden">
        {permissions.length === 0 ? (
          <p>Loading ...</p>
        ) : (
          permissions.map((item) => (
            <Card key={item.id} item={item} remove={remove} />
          ))
        )}
      </div>
    </>
  );
}
