export const mergeUniqueArray = <T extends Item>(
  existingArray: T[],
  newArray: T[],
  key: keyof T = 'id'
): T[] => {
  let uniqueIds = new Set(existingArray?.map((item) => item[key]));
  let uniqueObjects = newArray?.filter((item) => !uniqueIds.has(item[key]));

  return existingArray.concat(uniqueObjects);
};

export const mapUniqueObjectsInArray = <T extends object, K extends keyof T>(
  arr: T[],
  prop: K
): T[] => {
  const uniqueMap = new Map<T[K], T>();

  arr.forEach((obj) => {
    uniqueMap.set(obj[prop], obj);
  });

  return Array.from(uniqueMap.values());
};

export const addCommas: AddCommas = (value) => {
  if (value === undefined || value === null) {
    return '';
  }

  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const copyToClipboard = (v: string | undefined, toastDetails?: any) => {
  if (!v) return;
  navigator.clipboard?.writeText(v);

  // ADD TOAST
};
