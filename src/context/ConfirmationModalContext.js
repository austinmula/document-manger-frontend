import { Dialog, Transition } from "@headlessui/react";
import React, { useRef, useState, useContext } from "react";
const ConfirmationModalContext = React.createContext({});

const ConfirmationModalContextProvider = (props) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const resolver = useRef();

  const handleShow = () => {
    setShowConfirmationModal(true);

    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    setShowConfirmationModal(false);
  };

  const handleCancel = () => {
    resolver.current && resolver.current(false);
    setShowConfirmationModal(false);
  };

  return (
    <ConfirmationModalContext.Provider value={{ showConfirmation: handleShow }}>
      {props.children}
      <Transition appear show={showConfirmationModal} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-30"
          onClose={() => setShowConfirmationModal(false)}
        >
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title className="text-xl font-bold text-red-700">
                Warning
              </Dialog.Title>
              <Dialog.Description className={"py-6"}>
                Are you sure you want to delete ?
              </Dialog.Description>

              <div className="text-right">
                <button
                  onClick={handleOk}
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                >
                  Delete
                </button>

                <button
                  onClick={handleCancel}
                  className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                >
                  Cancel
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </ConfirmationModalContext.Provider>
  );
};

export const useConfirmationModalContext = () =>
  useContext(ConfirmationModalContext);
export default ConfirmationModalContextProvider;
