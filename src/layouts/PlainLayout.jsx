import { Outlet } from "react-router-dom";

export default function PlainLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Outlet />
    </div>
  );
}
