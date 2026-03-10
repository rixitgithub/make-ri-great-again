import { clearCookies } from '../helpers/others/cookies';

export const asyncHandler = async (
  fn: () => Promise<any>,
  fnName?: string,
  showToast: boolean = true,
  setError?: (error: any) => void,
  byPassError: boolean = false
): Promise<any> => {
  try {
    return await fn();
  } catch (error) {
    if (byPassError) {
      throw error;
    }
    return handleError(error, fnName, showToast);
  }
};

const handleError = (
  error: any,
  fnName: string | undefined,
  showToast: boolean,
  setError?: (error: any) => void
): any => {
  // Early return if the error is due to a canceled request
  if (error?.name === 'CanceledError') {
    return;
  }

  // If function name is defined, skip further error handling
  if (fnName) {
    return;
  } else {
    // Handle specific HTTP status codes
    if (error?.response?.status === 401) {
      clearCookies(); // Clear cookies for unauthorized access
    } else if (error?.response?.status === 402) {
      return {
        error: true,
        ...error?.response?.data, // Return error data for 402
      };
    } else if (error?.response?.status === 425) {
      setError && setError(true); // Trigger error state for 425
    } else if (error?.name === 'AxiosError' && error?.code === 'ECONNABORTED') {
      // Handle timeout errors
      if (showToast) {
        // toast({
        //   variant: 'failed',
        //   title: 'Request timeout, please try again later.',
        // });
      }
    } else {
      // Show general error toast for other errors
      if (showToast) {
        // toast({
        //   variant: 'failed',
        //   title:
        //     error?.response?.data?.message ||
        //     error?.response?.data?.data?.message ||
        //     'Something went wrong',
        // });
      }
      return error;
    }
  }
};
