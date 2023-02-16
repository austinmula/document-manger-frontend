import React from "react";

const TextInput = ({
  fieldName,
  register,
  errors,
  placeHolder,
  isRequired,
  maximLength,
  minimLength,
  type,
}) => {
  return (
    <div className="form-field">
      <input
        type={type}
        placeholder={placeHolder}
        {...register(fieldName, {
          required: {
            value: isRequired,
            message: `${fieldName} is required`,
          },
          maxLength: {
            value: maximLength,
            message: `${fieldName} must be maximum ${maximLength}`,
          },
          minLength: {
            value: minimLength,
            message: `${fieldName} must be minimum ${minimLength}`,
          },
        })}
        className={`block w-full appearance-none rounded-md border  px-3 py-2  focus:outline-none ${
          errors[fieldName]
            ? "text-red-300 border-red-400"
            : "border-gray-300 focus:border-indigo-400"
        }`}
      />

      <small className="text-red-300">
        {errors[fieldName] && errors[fieldName].message}
      </small>
    </div>
  );
};

export default TextInput;
