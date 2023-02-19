import {
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
// import { Link } from "react-router-dom";
// import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";

const SideBar = forwardRef(({ showSideBar }, ref) => {
  const { isAdmin } = useAdmin();
  //   const router = useRouter();
  const data = [
    {
      id: 1,
      name: "dashboard",
      path: "/dashboard",
      icon: <ChartBarIcon className="h-5 w-5 text-emerald-800" />,
      admin: true,
      user: false,
    },
    {
      id: 2,
      name: "home",
      path: "/dashboard/home",
      icon: <HomeIcon className="h-5 w-5 text-emerald-800" />,
      admin: true,
      user: true,
    },
    {
      id: 3,
      name: "users",
      path: "/dashboard/users",
      icon: <UserIcon className="h-5 w-5 text-emerald-800" />,
      admin: true,
      user: false,
    },
    {
      id: 4,
      name: "files",
      path: "/dashboard/files",
      icon: <FolderIcon className="h-5 w-5 text-emerald-800" />,
      admin: true,
      user: false,
    },
  ];

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm z-10">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            className="w-32 h-auto"
            src="/ferox-transparent.png"
            alt="company logo"
          />
        </picture>
      </div>

      <div className="flex flex-col">
        {data.map((link) => (
          <NavLink
            key={link.path}
            end
            to={link.path}
            style={({ isActive }) => ({
              background: isActive ? "#ededed" : "",
            })}
          >
            <div
              className={`${
                (link.name === "dashboard" || link.name === "users") && !isAdmin
                  ? "hidden"
                  : "block"
              } pl-6 py-3 mx-5 text-emerald-800 rounded text-center cursor-pointer mb-3 flex items-center transition-colors 
          `}
            >
              <div className="mr-2">{link.icon}</div>
              <div>
                <p>{link.name}</p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
