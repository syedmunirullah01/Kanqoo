// lib\toast-utils.js
import { toast } from 'sonner';

/**
 * Toast notification utilities for consistent messaging across the app
 */

// Success notifications
export const showSuccessToast = (title, description) => {
  toast.success(title, { description });
};

// Error notifications
export const showErrorToast = (title, description) => {
  toast.error(title, { description });
};

// Warning notifications
export const showWarningToast = (title, description) => {
  toast.warning(title, { description });
};

// Info notifications
export const showInfoToast = (title, description) => {
  toast.info(title, { description });
};

// Network-specific notifications
export const showNetworkSuccessToast = (networkName) => {
  toast.success(`${networkName} network added successfully!`, {
    description: `Your ${networkName} network has been connected and is ready to use.`
  });
};

export const showNetworkErrorToast = (networkName, error) => {
  toast.error(`Failed to add ${networkName} network`, {
    description: error || `An error occurred while adding the ${networkName} network.`
  });
};

// Validation notifications
export const showValidationErrorToast = () => {
  toast.error("Validation Error", {
    description: "Please fix the validation errors before submitting."
  });
};

// Loading toast (for longer operations)
export const showLoadingToast = (message) => {
  return toast.loading(message);
};

// Dismiss loading toast
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

// Update loading toast to success
export const updateToastToSuccess = (toastId, title, description) => {
  toast.success(title, { id: toastId, description });
};

// Update loading toast to error
export const updateToastToError = (toastId, title, description) => {
  toast.error(title, { id: toastId, description });
};
