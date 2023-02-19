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

  const link =
    "http://document_manager.appp/storage/files/YOW6r2IGaqZxgBGDv2Tvzj2PQ5zNhGE04Kp7CbSu.docx";

  if (isLoading) return <div>Loading ...</div>;

  return (
    <div>
      <p>{file?.name}</p>
      <p>{`http://document_manager.appp/storage/${file.url}`}</p>
      <iframe
        // src="http://document_manager.appp/storage/files/YOW6r2IGaqZxgBGDv2Tvzj2PQ5zNhGE04Kp7CbSu.docx"
        src="http://document_manager.appp/storage/files/we1zONb9PJRpGKon2xwK2E2Fws3cSfOErftb0GXH.pdf"
        style={{ width: "90%", height: "1000px" }}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
      <iframe
        src={`https://docs.google.com/gview?url=${link}&embedded=true`}
      ></iframe>
    </div>
  );
};

export default SingleFile;
