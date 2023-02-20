import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ApproveRequest({ open, setOpen, file_id, user_id, request_id }) {
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector((state) => state.requests);
  const handleSubmit = () => {
    if (date) {
      var expires_at = new Date(date);
      var dd = String(expires_at.getDate()).padStart(2, "0");
      var mm = String(expires_at.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = expires_at.getFullYear();
      var time = expires_at.toLocaleTimeString("en-US", {
        hourCycle: "h23",
      });

      expires_at = yyyy + "-" + mm + "-" + dd + " " + time;
      const data = { expires_at, file_id, user_id, request_id };
      console.log(data);

      // dispatch(editrequestdetails(data));
      if (isSuccess) {
        setOpen(false);
      }
    }
  };
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={() => setOpen(false)}
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="text-xl font-bold text-emerald-700">
                Approve Request
              </Dialog.Title>
              <Dialog.Description className={"py-3"}></Dialog.Description>
              <div>{/* <RequestAccess /> */}</div>

              <div className="my-6">
                <form>
                  <label
                    HtmlFor="expires_at"
                    className="block font-bold text-sm mb-2 text-gray-600"
                  >
                    Provide Access Upto:
                  </label>
                  <input
                    onChange={(e) => setDate(e.target.value)}
                    type="datetime-local"
                    id="expires_at"
                    name="expires_at"
                    className="block w-full appearance-none rounded-md border  px-3 py-2  focus:outline-none"
                  ></input>
                </form>
              </div>

              <div className="text-right">
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                >
                  Approve
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ApproveRequest;
