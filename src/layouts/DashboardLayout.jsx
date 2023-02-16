import { useState, useEffect, Fragment } from "react";
import SideBar from "../components/layout/SideBar";
import TopNavigation from "../components/layout/TopNavigation";
import { Transition } from "@headlessui/react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (window.innerWidth <= 640) {
      setShowSideBar(false);
      setIsMobile(true);
    } else {
      setShowSideBar(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <TopNavigation
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
      />
      <Transition
        as={Fragment}
        show={showSideBar}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showSideBar={showSideBar} />
      </Transition>
      <main
        className={`pt-16 transition-all duration-[400ms] ${
          showSideBar && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="px-4 md:px-16 pt-5">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default DashboardLayout;
