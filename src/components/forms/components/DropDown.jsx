import React from "react";

const DropDown = ({
  fieldName,
  register,
  errors,
  placeHolder,
  isRequired,
  data,
}) => {
  return (
    <div className="form-field">
      <select
        placeholder={placeHolder}
        {...register(fieldName, {
          required: {
            value: isRequired,
            message: `${fieldName} is required`,
          },
        })}
        className={`block w-full appearance-none rounded-md border  px-3 py-2  focus:outline-none ${
          errors[fieldName]
            ? "text-red-300 border-red-400"
            : "border-gray-300 focus:border-indigo-400"
        }`}
      >
        {data.map((item) => (
          <option value={item.id}>{item.name}</option>
        ))}
      </select>

      <small className="text-red-300">
        {errors[fieldName] && errors[fieldName].message}
      </small>
    </div>
  );
};

export default DropDown;
