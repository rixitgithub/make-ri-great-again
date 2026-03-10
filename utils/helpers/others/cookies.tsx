import { PATH } from '@/utils/constants/others/paths';
import Cookies from 'js-cookie';

export const clearCookies = (
  path?: string,
  shouldRedirect: boolean = true
): void => {
  const cookies = Cookies.get();

  for (const cookie in cookies) {
    if (Object.prototype.hasOwnProperty.call(cookies, cookie)) {
      Cookies.remove(cookie);
    }
  }

  if (shouldRedirect) {
    window.location.href = path || PATH.SIGNIN;
  }
};
