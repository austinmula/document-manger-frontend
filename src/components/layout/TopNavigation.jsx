import { Fragment } from "react";
import {
  Bars3CenterLeftIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

export default function TopNavigation({ showSideBar, setShowSideBar }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div
      className={`fixed w-full h-16 flex justify-between items-center transition-all duration-[400ms] ${
        showSideBar ? "pl-56" : ""
      }`}
    >
      <div className="pl-4 md:pl-16">
        <Bars3CenterLeftIcon
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowSideBar(!showSideBar)}
        />
      </div>
      <div className="flex items-center pr-4 md:pr-16">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex gap-1 w-full justify-center items-center">
              <div className="w-6 h-6 bg-black rounded-full overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  className="object-cover"
                  alt="profile"
                />
              </div>
              <span className="hidden md:block font-medium text-gray-700">
                {user ? user.user.name : null}
              </span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-gray-700" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
              <div className="p-1">
                <Menu.Item>
                  <Link
                    onClick={handleLogOut}
                    className="flex hover:bg-emerald-800 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                    Logout
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
