import { toast, ToastOptions } from "react-toastify";

export const showSuccessToast = (
    message: string,
    options?: ToastOptions,
) => {
    toast.success(`${message}`, {
        position: "top-right",
        autoClose: 3000,
        type: "success",
        ...options
    });
}

export const showErrorToast = (
    message: string,
    options?: ToastOptions
) => {
    toast.error(`${message}`, {
        position: "top-right",
        autoClose: 3000,
        type: "error",
        ...options
    });
}