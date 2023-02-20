import React from "react";
import { useNavigate } from "react-router-dom";

const LandingContainer = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-7xl w-10/12 ">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="left w-full">
            <img src="/File-manager.png" alt="File Manager" />
          </div>
          <div className="px-5 flex gap-5 flex-col">
            <h1 className="text-3xl md:text-5xl my-4 tracking-wide text-emerald-800 font-bold">
              <span className="block my-5 whitespace-nowrap">Flysystem</span>
              Document Manager
            </h1>
            <p className="font-thin text-sm md:text-lg text-gray-900">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit inventore rerum ut sunt adipisci labore. Facere
              magni laudantium delectus quasi illum repellat neque laboriosam,
            </p>

            <div>
              <button
                type="submit"
                onClick={() => navigate("/login")}
                className="group relative flex justify-center rounded-md border border-transparent bg-emerald-800 py-4 p-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Proceed To Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingContainer;
