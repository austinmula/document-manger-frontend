import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ExclamationTriangleIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import TextInput from "./components/TextInput";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { reset } from "../../features/files/filesSlice";

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isSuccess, user, message, isLoading } = useSelector(
    (state) => state.auth
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function loginSubmit(data) {
    dispatch(login(data));
  }

  const nav = useCallback(() => {
    navigate("/dashboard");
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isSuccess || user) {
      nav();
    }
  }, [isSuccess, nav]);

  return (
    <>
      <form onSubmit={handleSubmit(loginSubmit)} className="mt-8 space-y-6">
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
              placeHolder="Enter your Email"
              isRequired={true}
              maximLength={20}
              minimLength={2}
              type="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-bold text-sm mb-2 text-gray-600"
            >
              Password
            </label>

            <TextInput
              fieldName="password"
              register={register}
              errors={errors}
              placeHolder="Enter Password"
              isRequired={true}
              maximLength={20}
              minimLength={2}
              type="password"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-emerald-800 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-emerald-700 group-hover:text-emerald-600" />
            </span>
            {isLoading ? "Loading..." : "Sign in"}
          </button>
        </div>

        {isError ? (
          <div className="relative flex w-full  rounded-md border border-transparent border-red-700 py-2 px-1 text-sm font-medium text-red-700 ">
            <span className=" inset-y-0 left-0 flex items-center pl-3">
              {/* < className="h-5 w-5 text-emerald-700 group-hover:text-emerald-600" />
               */}
              <ExclamationTriangleIcon className="h-5 w-5 text-red-700 mr-4" />
            </span>
            {message}
          </div>
        ) : null}
      </form>
    </>
  );
}
