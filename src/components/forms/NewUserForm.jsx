import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LockClosedIcon, PlusIcon } from "@heroicons/react/24/solid";
import TextInput from "./components/TextInput";
import DropDown from "./components/DropDown";
import { useDispatch, useSelector } from "react-redux";
import { fetchallroles } from "../../features/roles/roleSlice";
import { fetchalldepartments } from "../../features/departments/departmentSlice";
import { createnewuser } from "../../features/users/userSlice";

export default function NewUserForm() {
  const { roles } = useSelector((state) => state.roles);
  const { departments } = useSelector((state) => state.departments);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchallroles());
    dispatch(fetchalldepartments());
  }, []);

  const newUserSubmit = (data) => {
    console.log(data);
    dispatch(createnewuser(data));
  };

  return (
    <>
      <form onSubmit={handleSubmit(newUserSubmit)} className="mt-8 space-y-6">
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <label
              htmlFor="email"
              className="block font-bold text-sm mb-2 text-gray-600"
            >
              Email
            </label>

            <TextInput
              fieldName="email"
              register={register}
              errors={errors}
              placeHolder="Enter User's Email"
              isRequired={true}
              maximLength={20}
              minimLength={2}
              type="email"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block font-bold text-sm mb-2 text-gray-600"
            >
              User Name
            </label>

            <TextInput
              fieldName="name"
              register={register}
              errors={errors}
              placeHolder="Enter User's Name"
              isRequired={true}
              maximLength={20}
              minimLength={2}
              type="text"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="role"
            className="block font-bold text-sm mb-2 text-gray-600"
          >
            Role
          </label>

          <DropDown
            fieldName="role"
            register={register}
            errors={errors}
            placeHolder="Select user role"
            isRequired={true}
            data={roles}
          />
        </div>

        <div>
          <label
            htmlFor="department"
            className="block font-bold text-sm mb-2 text-gray-600"
          >
            Department
          </label>

          <DropDown
            fieldName="department"
            register={register}
            errors={errors}
            placeHolder="Select user department"
            isRequired={true}
            data={departments}
          />
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
