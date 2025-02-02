import LoginForm from "@/components/forms/LoginForm";
import { IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

function LoginPage() {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <div className="max-w-md md:w-[700px]">
        <div className="flex items-center justify-center mb-5">
          <span className="bg-gray-300 p-4 rounded-full">
            <IconLogout className="inline text-2xl" />
          </span>
        </div>
        <h1 className="text-center text-2xl sm:text-3xl font-semibold text-primary-dark">
          Welcome back!
        </h1>
        <p className="text-center text-sm sm:text-base text-gray-500 mt-2">
          Do not have an account yet?{" "}
          <Link
            href="/auth/register"
            className="text-sm sm:text-base hover:underline text-primary-light"
          >
            Create account
          </Link>
        </p>
        <LoginForm />
      </div>

    </main>
  );
}

export default LoginPage;

