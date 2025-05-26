import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';

function ForgotPasswordPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div className="max-w-md md:w-[700px]">
        <h1 className="text-center text-2xl font-semibold text-primary-dark sm:text-3xl">
          Forgot your password?
        </h1>
        <p className="mt-2 text-center text-sm text-gray-500 sm:text-base">
          Enter your email to get a reset link
        </p>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}

export default ForgotPasswordPage;
