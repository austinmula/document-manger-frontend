import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function useAdmin() {
  const { user } = useSelector((state) => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user.token && user.user.role_id === 4) {
      setIsAdmin(true);
    }
  }, []);

  return { isAdmin };
}
