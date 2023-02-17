import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleterole,
  fetchallroles,
  reset,
} from "../../features/roles/roleSlice";

import Card from "./Card";

export default function AllPermissions() {
  const dispatch = useDispatch();
  const { roles } = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(fetchallroles());
    // return () => reset();
  }, []);

  const remove = async (id) => {
    await dispatch(deleterole(id));
  };

  return (
    <>
      <h2 className="text-xl font-bold">All Roles</h2>
      <div className="mt-4 grid gap-2 grid-cols-1 md:grid-cols-2 overflow-hidden">
        {roles.length === 0 ? (
          <p>Loading ...</p>
        ) : (
          roles.map((item) => (
            <Card key={item.id} item={item} remove={remove} />
          ))
        )}
      </div>
    </>
  );
}
