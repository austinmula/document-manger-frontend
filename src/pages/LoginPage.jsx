import { UserCircleIcon } from "@heroicons/react/24/solid";
import LoginForm from "../components/forms/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="w-full max-w-md space-y-8 px-4 py-6 bg-white rounded-md shadow-sm">
        <div>
          <UserCircleIcon className="mx-auto h-12 w-auto text-emerald-800" />

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-700">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email and password to access the dashboard.
          </p>
        </div>

        <LoginForm />
      </div>
    </>
  );
}
