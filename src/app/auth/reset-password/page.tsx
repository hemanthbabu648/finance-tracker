import ResetPasswordForm from "@/components/forms/ResetPasswordForm";

function ResetPasswordPage() {
    return (
        <main className="h-screen flex flex-col justify-center items-center">
            <div className="max-w-md md:w-[700px]">
                <h1 className="text-center text-2xl sm:text-3xl font-semibold text-primary-dark">
                    Please reset your password ✔
                </h1>
                <p className="text-center text-sm sm:text-base text-gray-500 mt-2">
                    Enter your new password
                </p>
                <ResetPasswordForm/>
            </div>
        </main>
    )
}

export default ResetPasswordPage;