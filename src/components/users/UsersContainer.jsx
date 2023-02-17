import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallusers, reset } from "../../features/users/userSlice";
import { DeleteButton } from "../forms/components/DeleteButton";
import NewUserForm from "../forms/NewUserForm";

const UsersContainer = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchallusers());

    return () => reset();
  }, []);

  return (
    <>
      <div className="mb-6">
        <button
          type="button"
          // disabled={isLoading}
          onClick={() => setOpen(!open)}
          className="group relative flex  justify-between rounded-md border border-transparent bg-emerald-800 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <span className="inset-y-0 flex items-center ">
            <PlusIcon className="h-5 w-5 text-emerald-700 group-hover:text-emerald-600 mr-2" />
          </span>
          Create New User
        </button>
      </div>

      {open && <NewUserForm />}
      <div className="shadow-sm bg-white mt-5">
        <table className="table-auto min-w-full">
          <thead className="border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                User name
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Email
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Role
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Department
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <th>Loading ...</th>
              </tr>
            ) : (
              users?.map((user, index) => (
                <tr className="border-b" key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.role?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.departments?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <DeleteButton
                      // onClick={() => remove(item.id)}
                      className="rounded-full shrink-0 bg-gray-100 h-8 w-8 flex items-center justify-center cursor-pointer"
                    >
                      <TrashIcon className="h-5 w-5 text-red-700" />
                    </DeleteButton>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersContainer;
