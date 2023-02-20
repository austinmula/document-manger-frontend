import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchrequeststome,
  reset,
} from "../../features/requests/requestsSlice";
import ApproveRequest from "./ApproveRequest";

import Modal from "./Modal";

const RequestsToMe = () => {
  const dispatch = useDispatch();
  const { request_me } = useSelector((state) => state.requests);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchrequeststome());

    return () => reset();
  }, []);

  return (
    <>
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
                Request From
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left "
              >
                For Document
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Message
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {request_me?.length === 0 ? (
              <tr>
                <th>No requests</th>
              </tr>
            ) : (
              request_me?.map((request, index) => (
                <tr className="border-b" key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.user?.name}
                  </td>
                  <td className="px-6 py-4  text-sm font-medium text-gray-900">
                    {request.file?.name}
                  </td>
                  <td className="px-6 py-4 x text-sm font-medium text-gray-900">
                    {request.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {request.status?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div
                      onClick={() => setOpen(true)}
                      className="rounded-full shrink-0 bg-gray-100 h-8 w-8 flex items-center justify-center cursor-pointer"
                    >
                      <CheckCircleIcon className="h-5 w-5 text-green-700" />
                      {open ? (
                        <ApproveRequest
                          open={open}
                          setOpen={setOpen}
                          file_id={request.file.id}
                          user_id={request.user.id}
                          request_id={request.id}
                        />
                      ) : null}
                    </div>

                    <div
                      // onClick={() => remove(item.id)}
                      className="rounded-full shrink-0 bg-gray-100 h-8 w-8 flex items-center justify-center cursor-pointer"
                    >
                      <XCircleIcon className="h-5 w-5 text-red-700" />
                    </div>
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

export default RequestsToMe;
