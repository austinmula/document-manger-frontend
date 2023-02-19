import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallfiles, reset } from "../features/files/filesSlice";
import { FileIcon, defaultStyles } from "react-file-icon";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  ArrowRightOnRectangleIcon,
  CloudArrowUpIcon,
  DocumentArrowDownIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import ConfirmationModalContextProvider from "../context/ConfirmationModalContext";
import CountdownTimer from "../components/timer/CountdownTimer";
import useAdmin from "../hooks/useAdmin";
import UploadFile from "../components/files/UploadFile";
import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

export default function Files() {
  const dispatch = useDispatch();
  const { isAdmin } = useAdmin();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchallfiles());

    return () => reset();
  }, []);

  const { files, isLoading, temp_files } = useSelector((state) => state.files);

  if (isLoading) {
    return <p>isLoading</p>;
  }

  return (
    <div>
      <ConfirmationModalContextProvider>
        <div className="shadow-sm bg-emerald-800 p-4 mb-4 flex items-center justify-between radius-md ">
          <div className="flex gap-2 items-center">
            <FolderIcon className="w-9 h-9 text-gray-100" />
            <h2 className="text-lg font-extrabold text-white">File Explorer</h2>
          </div>
          {isAdmin && (
            <div>
              <button
                onClick={() => setOpen(!open)}
                className="group relative flex gap-2 justify-between rounded-md border border-emerald-100 py-2 px-4 text-sm font-medium text-emerald-50 hover:border-emerald-100 "
              >
                <span className=" inset-y-0 flex items-center ">
                  <CloudArrowUpIcon className="h-5 w-5 text-emerald-100 group-hover:text-emerald-200" />
                </span>
                Upload
              </button>
            </div>
          )}
        </div>
        {isAdmin && open ? (
          <Transition
            show={open}
            // as={Fragment}
            enter="ease-out duration-400"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <UploadFile />
          </Transition>
        ) : null}

        <div className="grid"></div>
        <div>
          <h2 className="text-md font-semibold mt-12 pb-4">All Files</h2>
          <div>
            {files?.length === 0 ? (
              <div>
                <p>You have no files</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
                {files?.map((file) => (
                  <div
                    key={file.url}
                    className="bg-white rounded-md shadow-sm p-4 relative flex gap-5 flex-col h-44"
                  >
                    <div className="h-8  ">
                      <div className="w-8">
                        <FileIcon
                          extension={file.url.split(".").pop()}
                          {...defaultStyles[file.url.split(".").pop()]}
                        />
                      </div>
                      <div className="absolute top-4 right-2">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="py-5">
                      <span>
                        <small className="line-clamp-2">{file.name}</small>
                      </span>
                    </div>
                    <div className="mt-4 absolute bottom-2 left-4 w-8 h-8 p-2 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer">
                      <DocumentArrowDownIcon className="w-full h-full text-emerald-800" />
                    </div>
                    <div
                      onClick={() => navigate(`/dashboard/files/${file.id}`)}
                      className="mt-4 absolute bottom-2 right-4 w-8 h-8 p-2 rounded-full bg-slate-100 flex items-center justify-center cursor-pointer"
                    >
                      <ArrowRightOnRectangleIcon className="w-full h-full text-gray-800" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <h2 className="text-2xl pb-4 pt-12 ">Temporary Files</h2>
          <div>
            {temp_files?.length === 0 ? (
              <div>
                <p>You have no files</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
                {temp_files?.map((file) => (
                  <div
                    key={file.url}
                    className="bg-white rounded-md shadow-sm p-4 relative flex gap-5 flex-col h-44"
                  >
                    <div className="h-8  ">
                      <div className="w-8">
                        <FileIcon
                          extension={file.url.split(".").pop()}
                          {...defaultStyles[file.url.split(".").pop()]}
                        />
                      </div>
                      <div className="absolute top-4 right-2">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="py-5">
                      <span>
                        <small className="line-clamp-2">{file.name}</small>
                      </span>
                    </div>
                    <CountdownTimer targetDate={file.pivot.expires_at} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ConfirmationModalContextProvider>
    </div>
  );
}
