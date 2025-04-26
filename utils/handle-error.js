import Toast from "../helpers/status-text";

export const handleError = (error, options = {}) => {
  const errors = error?.errors;

  if (Array.isArray(errors)) {
    errors.forEach((err) => {
      Toast.error(err.message, options);
    });
  } else if (typeof errors === "string") {
    Toast.error(errors);
  }

  console.error("Error:", error);
};
