export const PATH = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
} as const;

export const OPEN_PATHS: string[] = [PATH.SIGNIN, PATH.SIGNUP];

export const getDynamicPath = (id: string) => {
  return {};
};
