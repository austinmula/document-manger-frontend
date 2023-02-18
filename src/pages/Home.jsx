import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallfiles, reset } from "../features/files/filesSlice";
import { FileIcon, defaultStyles } from "react-file-icon";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import ConfirmationModalContextProvider from "../context/ConfirmationModalContext";
import CountdownTimer from "../components/timer/CountdownTimer";
import Profile from "../components/profile/Profile";

export default function Home() {
  const dispatch = useDispatch();

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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-4">
            <Profile />
          </div>
          <div className="col-span-8">
            <div>
              {/* <h2 className="text-md font-semibold mt-12 pb-4">All Files</h2> */}
              <div>
                {files?.length === 0 ? (
                  <div>
                    <p>You have no access to any files</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6  gap-4">
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mt-4">
                {temp_files?.length === 0 ? (
                  <div>
                    <p>You have no temporary files</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
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
          </div>
        </div>
      </ConfirmationModalContextProvider>
    </div>
  );
}
