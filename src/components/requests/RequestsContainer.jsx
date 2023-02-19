import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallrequests, reset } from "../../features/requests/requestsSlice";
import { DeleteButton } from "../forms/components/DeleteButton";
import NewUserForm from "../forms/NewUserForm";
import Modal from "./Modal";
import RequestsToMe from "./RequestsToMe";

const RequestsContainer = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requests);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchallrequests());

    return () => reset();
  }, []);

  return (
    <>
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="group relative flex  justify-between rounded-md border border-transparent bg-emerald-800 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <span className="inset-y-0 flex items-center ">
            <PlusIcon className="h-5 w-5 text-emerald-700 group-hover:text-emerald-600 mr-2" />
          </span>
          Create New Request
        </button>
      </div>
      {open && <Modal open={open} setOpen={setOpen} />}

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
                Title
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left "
              >
                Message
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Document name
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Status
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
            {requests?.length === 0 ? (
              <tr>
                <th>No requests</th>
              </tr>
            ) : (
              requests?.map((request, index) => (
                <tr className="border-b" key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.name}
                  </td>
                  <td className="px-6 py-4  text-sm font-medium text-gray-900">
                    {request.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.file?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.status?.name}
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

      <RequestsToMe />
    </>
  );
};

export default RequestsContainer;
