import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallfiles, reset } from "../features/files/filesSlice";
import { FileIcon, defaultStyles } from "react-file-icon";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import ConfirmationModalContextProvider from "../context/ConfirmationModalContext";
import { DeleteButton } from "../components/forms/components/DeleteButton";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchallfiles());

    return () => reset();
  }, []);

  const { files, isLoading } = useSelector((state) => state.files);

  if (isLoading) {
    return <p>isLoading</p>;
  }

  const remove = (n) => {
    console.log(n);
  };

  return (
    <div>
      <ConfirmationModalContextProvider>
        <h2 className="text-2xl pb-4">All Files</h2>
        <div>
          {files?.length === 0 ? (
            <div>
              <p>You have no files</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
              {files?.data.map((file) => (
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

        <DeleteButton onClick={() => remove(1)} className="btn btn-danger">
          Delete
        </DeleteButton>
      </ConfirmationModalContextProvider>
    </div>
  );
}
