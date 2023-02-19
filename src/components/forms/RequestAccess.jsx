import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LockClosedIcon, PlusIcon } from "@heroicons/react/24/solid";
import TextInput from "./components/TextInput";
import DropDown from "./components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { fetchprotectedfiles } from "../../features/files/filesSlice";
import { createnewrequest } from "../../features/requests/requestsSlice";

export default function RequestAccess() {
  const { user } = useSelector((state) => state.auth);
  const { noaccess } = useSelector((state) => state.files);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // dispatch(fetchallroles());
    dispatch(fetchprotectedfiles());
  }, []);

  const newFileRequest = (data) => {
    console.log(data);
    const department_id = noaccess.map((item) => {
      return item.departments[0].id;
    });

    data = { ...data, department_id: department_id[0], user_id: user.user.id };
    console.log(data);
    dispatch(createnewrequest(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(newFileRequest)} className="mt-8 space-y-6">
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <label
              htmlFor="name"
              className="block font-bold text-sm mb-2 text-gray-600"
            >
              Title
            </label>

            <TextInput
              fieldName="name"
              register={register}
              errors={errors}
              placeHolder="Request title"
              isRequired={true}
              maximLength={20}
              minimLength={2}
              type="text"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="file"
            className="block font-bold text-sm mb-2 text-gray-600"
          >
            Select File You want Access to
          </label>

          <DropDown
            fieldName="file_id"
            register={register}
            errors={errors}
            placeHolder="Select a file"
            isRequired={true}
            data={noaccess}
          />
        </div>

        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <label
              htmlFor="message"
              className="block font-bold text-sm mb-2 text-gray-600"
            >
              Message
            </label>

            <TextInput
              fieldName="message"
              register={register}
              errors={errors}
              placeHolder="Enter User's message"
              isRequired={true}
              maximLength={60}
              minimLength={2}
              type="text"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative flex gap-2  justify-between rounded-md border border-transparent bg-emerald-800 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <span className=" inset-y-0 flex items-center ">
              <PlusIcon className="h-5 w-5 text-emerald-700 group-hover:text-emerald-600" />
            </span>
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
