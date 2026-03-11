import { toast } from '@/hooks/useToast';
import { COOKIES } from '@/utils/constants/others/cookies';
import { PATH } from '@/utils/constants/others/paths';
import { gtmDataLayerPush } from '@/utils/helpers/others/common';
import { getData, postData } from '@/utils/services';

import Cookies from 'js-cookie';
import type { NextRouter } from 'next/router';

// move to types 

interface AuthResponseData {
  authToken?: string;
  verified?: boolean;
  onboardingCompleted?: boolean;
}

interface ApiResponse<T = any> {
  status?: number;
  error?: boolean;
  data?: { data?: T; message?: string };
  [key: string]: any;
}

interface HandleAuthParams {
  response: ApiResponse<AuthResponseData>;
  successMessage: string;
  router: NextRouter;
  invitationId?: string;
  workspaceId?: string;
  shouldRedirectToOnboarding?: boolean;
}

const handleAuth = async ({
  response,
  successMessage,
  router,
  invitationId,
  workspaceId,
  shouldRedirectToOnboarding = false,
}: HandleAuthParams) => {
  if (!response) return;

  const { authToken, verified, onboardingCompleted } =
    response?.data?.data || {};

  Cookies.set(COOKIES.AUTH_TOKEN, authToken || '', { expires: 365 });
Cookies.set(COOKIES.VERIFIED, verified ? 'true' : 'false', { expires: 365 });

  const firstPage = Cookies.get(COOKIES.FIRST_PAGE);
  const plan = Cookies.get(COOKIES.BUY_PLAN);

  toast({
    title: response?.data?.message || successMessage,
  });

  if (!verified) {
    localStorage.setItem('resendTimestamp', Date.now().toString());
    router.push(PATH.VERIFY_EMAIL);
    return;
  }

  Cookies.remove(COOKIES.REGISTERED_EMAIL);

  const onboardingDone =
    onboardingCompleted || Cookies.get(COOKIES.ONBOARDING_COMPLETED) === 'true';

  if (shouldRedirectToOnboarding && !onboardingDone) {
    window.location.href = PATH.ONBOARDING;
    return;
  }

  if (plan) {
    Cookies.remove(COOKIES.REGISTERED_EMAIL);
    window.location.href = PATH.PLAN_OFFER;
  } else if (invitationId && workspaceId) {
    window.location.href = `${PATH.SETTINGS}/workspace/${workspaceId}?invitationId=${invitationId}`;
  } else if (firstPage) {
    window.location.href = firstPage;
  } else {
    window.location.href = PATH.INITIAL;
  }
};

// move to .types
interface UserPayload {
  email?: string;
  password?: string;
  [key: string]: any;
}

export const createUser = async ({
  payload,
  router,
  setLoading,
}: {
  payload: UserPayload;
  router: NextRouter;
  setLoading: (loading: boolean) => void;
}) => {
  setLoading(true);
  const response = await postData('/auth/sign-up', payload);

  if (response?.error || response?.status === 409) {
    setLoading(false);
    return response?.data;
  }

  gtmDataLayerPush({ event: 'sign_up', email: payload?.email });

  await handleAuth({
    response,
    successMessage: 'Signup successful',
    router,
    shouldRedirectToOnboarding: true,
  });

  setLoading(false);
  return response?.data;
};

export const loginUser = async ({
  payload,
  router,
  setLoading,
  invitationId,
  workspaceId,
}: {
  payload: UserPayload;
  router: NextRouter;
  setLoading: (loading: boolean) => void;
  invitationId?: string;
  workspaceId?: string;
}) => {
  setLoading(true);
  try {
    const response = await postData('/auth', payload, {}, undefined, false, undefined, true);

    await handleAuth({
      response,
      successMessage: 'Login successful',
      router,
      invitationId,
      workspaceId,
    });

    return response?.data;
  } catch (error: any) {
    toast({
      type: 'failed',
      title:
        error?.response?.data?.message || 'Login failed. Please try again.',
    });
  } finally {
    setLoading(false);
  }
};

export const acceptWorkspaceInvitationNewUser = async ({
  payload,
  setLoading,
  router,
}: {
  payload: UserPayload;
  setLoading: (loading: boolean) => void;
  router: NextRouter;
}) => {
  setLoading(true);
  const response = await postData('/auth/inviteUserSignup', payload);
  await handleAuth({ response, successMessage: 'Signup successful', router });
  setLoading(false);

  return response?.data;
};

export const forgetPassword = async ({
  payload,
  setLoading,
}: {
  payload: UserPayload;
  setLoading: (loading: boolean) => void;
}) => {
  setLoading(true);
  const response = await postData('/auth/forgot-password', payload);

  if (response?.status === 200) {
    toast({
      title: response?.data?.message || 'OTP sent to your email.',
    });
  }

  setLoading(false);
  return response;
};

export const resetPassword = async ({
  payload,
  setLoading,
}: {
  payload: UserPayload;
  setLoading: (loading: boolean) => void;
}) => {
  setLoading(true);
  const response = await postData('/auth/set-password', payload);

  if (response?.status === 200) {
    toast({
      title: response?.data?.message || 'Password reset successfully.',
    });
  }

  setLoading(false);
  return response;
};

export const resendVerificationLink = async ({ payload }: { payload: { email: string } }) => {
  const encodedEmail = encodeURIComponent(payload.email);
  const response = await getData(`/auth/resend-verification?email=${encodedEmail}`);

  if (response?.status === 200) {
    toast({
      title: 'A verification link was sent to your email.',
    });
  }
};