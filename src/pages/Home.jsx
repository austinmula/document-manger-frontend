import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallfiles, reset } from "../features/files/filesSlice";
import { FileIcon, defaultStyles } from "react-file-icon";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import ConfirmationModalContextProvider from "../context/ConfirmationModalContext";
import CountdownTimer from "../components/timer/CountdownTimer";
import Profile from "../components/profile/Profile";
import RequestsContainer from "../components/requests/RequestsContainer";

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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-12">
          <div className="col-span-4">
            <Profile />
          </div>
          <div className="col-span-8"></div>
        </div>
        <RequestsContainer />
      </ConfirmationModalContextProvider>
    </div>
  );
}
