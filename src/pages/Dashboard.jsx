import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchallfiles } from "../features/files/filesSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchallfiles());
  }, []);

  const { files } = useSelector((state) => state.files);

  return (
    <div>
      <p>Dashboard??</p>
      {}
    </div>
  );
}
