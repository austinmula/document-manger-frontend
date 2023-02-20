import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchonefile } from "../features/files/filesSlice";

const SingleFile = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const { file, isLoading } = useSelector((state) => state.files);

  useEffect(() => {
    dispatch(fetchonefile(id));

    return () => {};
  }, []);

  // const baselink = "http://document_manager.appp/storage/";
  const baselink = "http://167.99.233.23/storage/";

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div>
      <p className="font-bold text-xl pb-6">{file?.name}</p>
      {/* <iframe
        src={`${baselink}${file.url}`}
        style={{ width: "90%", height: "1000px" }}
      > */}
      {/* <p>Your browser does not support iframes.</p> */}
      {/* </iframe>
      <iframe
        src={`https://docs.google.com/gview?url=${baselink}${file.url}&embedded=true`}
      ></iframe> */}

      <iframe
        src={`https://docs.google.com/gview?url=${baselink}${file.url}&embedded=true`}
        style={{ width: "90%", height: "1000px" }}
      ></iframe>
    </div>
  );
};

export default SingleFile;
