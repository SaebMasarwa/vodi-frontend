import { Bounce, toast, ToastOptions } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  transition: Bounce,
};

export function reactToastifyError(message: string) {
  toast.error(message, toastOptions);
}

export function reactToastifySuccess(message: string) {
  toast.success(message, toastOptions);
}
