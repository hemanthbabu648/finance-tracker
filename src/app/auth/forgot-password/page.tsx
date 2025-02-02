import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

function ForgotPasswordPage() {
    return (
        <main className="h-screen flex flex-col justify-center items-center">
            <div className="max-w-md md:w-[700px]">
                <h1 className="text-center text-2xl sm:text-3xl font-semibold text-primary-dark">
                    Forgot your password?
                </h1>
                <p className="text-center text-sm sm:text-base text-gray-500 mt-2">
                    Enter your email to get a reset link
                </p>
                <ForgotPasswordForm/>
            </div>
        </main>
    )
}

export default ForgotPasswordPage;