import { Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-tailwindcss-select";
import { fetchalldepartments } from "../../features/departments/departmentSlice";
import { createnewfile } from "../../features/files/filesSlice";
import { fetchfilecategories } from "../../features/filescategories/filesCategorySlice";

import { fetchallroles } from "../../features/roles/roleSlice";
import DropDown from "../forms/components/DropDown";
import TextInput from "../forms/components/TextInput";

function UploadFile() {
  const { roles } = useSelector((state) => state.roles);
  const { departments } = useSelector((state) => state.departments);
  const { categories } = useSelector((state) => state.categories);

  const [file, setFile] = useState(null);

  const handleChange = (value) => {
    // console.log("value:", value);
    // setAnimal(value);
  };

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    dispatch(fetchallroles());
    dispatch(fetchfilecategories());
  }, []);
  useEffect(() => {
    dispatch(fetchalldepartments());
  }, []);

  const submitForm = (data) => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("name", data.name);
    formData.append("category", data.category);

    data.departments.forEach((element) => {
      formData.append("departments[]", element);
    });

    data.roles.forEach((element) => {
      formData.append("roles[]", element);
    });

    console.log(formData.getAll("file"));

    dispatch(createnewfile(formData));
  };

  return (
    <div className="bg-white shadow-sm p-4 mb-4 ">
      <form
        onSubmit={handleSubmit(submitForm)}
        className="mt-8 space-y-6"
        encType="multipart/form-data"
      >
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <label
              htmlFor="name"
              className="block font-bold text-sm mb-2 text-gray-600"
            >
              File name
            </label>

            <TextInput
              fieldName="name"
              register={register}
              errors={errors}
              placeHolder="Enter file name"
              isRequired={true}
              maximLength={30}
              minimLength={2}
              type="text"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="categories"
            className="block font-bold text-sm mb-2 text-gray-600"
          >
            Categories
          </label>

          <DropDown
            fieldName="category"
            register={register}
            errors={errors}
            placeHolder="Select"
            isRequired={true}
            data={categories}
          />
        </div>

        <div>
          <label
            htmlFor="departments"
            className="block font-bold text-sm mb-2 text-gray-600"
          >
            Departments
          </label>
          <div className="flex flex-wrap gap-x-5">
            {departments.map((department) => (
              <div className="flex" key={department.id}>
                <div className="flex justify-end items-center">
                  <input
                    type="checkbox"
                    value={department.id}
                    className="w-4 h-4 border-gray-300 rounded"
                    {...register("departments")}
                  />
                  <label
                    htmlFor="disabled-checked-checkbox"
                    className="text-xs  ml-2 font-medium  min-w-fit"
                  >
                    {department.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="departments"
            className="block font-bold text-sm mb-2 text-gray-600"
          >
            Access level
          </label>
          <div className="flex flex-wrap gap-x-5">
            {roles.map((role) => (
              <div className="flex" key={role.id}>
                <div className="flex justify-end items-center">
                  <input
                    type="checkbox"
                    value={role.id}
                    className="w-4 h-4 border-gray-300 rounded"
                    {...register("roles")}
                  />
                  <label
                    htmlFor="disabled-checked-checkbox"
                    className="text-xs  ml-2 font-medium  min-w-fit"
                  >
                    {role.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="file"
            className="block font-bold text-sm mb-2 text-gray-600"
          >
            Upload file
          </label>

          <input
            id="file_input"
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files[0])}
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
    </div>
  );
}

export default UploadFile;
