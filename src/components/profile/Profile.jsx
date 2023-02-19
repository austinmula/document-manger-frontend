import { Disclosure, Transition } from "@headlessui/react";
import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-full max-w-sm bg-white border border-gray-100 rounded-lg shadow-sm">
      <div className="flex flex-col items-center py-10">
        <img
          className="w-20 h-20 mb-3 rounded-full shadow-lg"
          src="https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900">
          {user.user.name}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.user.departments?.name}
        </span>
        <span className="text-xs bg-emerald-200 text-emerald-800 rounded-md px-3 mt-2">
          {user.user.role?.name}
        </span>

        <div className="flex w-full flex-col mt-4 space-x-3 md:mt-6">
          <Disclosure>
            <Disclosure.Button className="py-2 bg-gray-200 font-bold font-xs">
              Permissions
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="flex items-center justify-center flex-wrap gap-2 py-3">
                {user.user.role?.permissions.map((item) => (
                  <div
                    key={item.id}
                    className="bg-orange-200 text-orange-700 rounded-lg text-xs gap-2 whitespace-nowrap px-3"
                  >
                    {item.slug}
                  </div>
                ))}
              </Disclosure.Panel>
            </Transition>
          </Disclosure>
        </div>
      </div>
    </div>
  );
}

export default Profile;
