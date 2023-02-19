import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import RequestAccess from "../forms/RequestAccess";

function Modal({ open, setOpen, title }) {
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
                Request permission
              </Dialog.Title>
              <Dialog.Description className={"py-3"}></Dialog.Description>
              <div>
                <RequestAccess />
              </div>

              <div className="text-right">
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

export default Modal;
