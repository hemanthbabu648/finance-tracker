import { Suspense } from 'react';

import ResetPasswordForm from '@/components/forms/ResetPasswordForm';

function ResetPasswordPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="max-w-md md:w-[700px]">
        <h1 className="text-center text-2xl font-semibold text-primary-dark sm:text-3xl">
          Please reset your password ✔
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500 sm:text-base">
          Enter your new password
        </p>
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}

export default ResetPasswordPage;
