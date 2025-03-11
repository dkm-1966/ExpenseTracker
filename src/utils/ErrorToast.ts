import toast from "react-hot-toast";

const ErrorToast = (message: string) => {
  return toast.error(message, {
    style: {
      background: "#374357",
      color: "#ffffff",
    },
  });
};

export default ErrorToast;
