import { toast } from '@/hooks/useToast';
import { PATH } from '@/utils/constants/others/paths';
import { postData } from '@/utils/services';

// move-interface 
interface Payload {
  [key: string]: any; 
}

interface AppsumoOnboardParams {
  payload: Payload;
}

interface ApplyCouponParams {
  payload: Payload;
}

interface UploadImageParams {
  payload: FormData;
}

interface CheckCustomDomainStatusParams {
  payload: Payload;
  showToast?: boolean;
}

export const appsumoOnboard = async ({
  payload,
}: AppsumoOnboardParams): Promise<any> => {
  const response = await postData(`/appsumo/onboard`, payload);
  return response?.data;
};

export const applyCoupon = async ({
  payload,
}: ApplyCouponParams): Promise<any> => {
  const response = await postData('/user/redeem-coupon', payload);

  if (response?.status === 200) {
    toast({
      title: response?.data?.message || 'Coupon Applied',
    });

    window.location.href = PATH.SETTINGS_BILLING;
  }

  return response?.data;
};

export const uploadImage = async ({
  payload,
}: UploadImageParams): Promise<any> => {
  const response = await postData(`/others/upload-image`, payload, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

  return response?.data;
};

export const checkCustomDomainStatus = async ({
  payload,
  showToast = true,
}: CheckCustomDomainStatusParams): Promise<any> => {
  const response = await postData(
    `/others/check-domain-status`,
    payload,
    {},
    undefined,
    showToast
  );

  return response?.data;
};