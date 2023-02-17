import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { HomeIcon, CreditCardIcon, UserIcon } from "@heroicons/react/24/solid";

const SideBar = forwardRef(({ showSideBar }, ref) => {
  //   const router = useRouter();

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
        <Link to="/">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors 
            `}
          >
            <div className="mr-2">
              <HomeIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Home</p>
            </div>
          </div>
        </Link>
        <Link to="/account">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors`}
          >
            <div className="mr-2">
              <UserIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Account</p>
            </div>
          </div>
        </Link>
        <Link to="/billing">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors `}
          >
            <div className="mr-2">
              <CreditCardIcon className="h-5 w-5" />
            </div>
            <div>
              <p>Billing</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
