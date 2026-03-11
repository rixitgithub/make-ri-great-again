import { toast } from '@/hooks/useToast';
import { COOKIES } from '@/utils/constants/others/cookies';
import { decode } from 'html-entities';
import { DomUtils, parseDocument, Element, DataNode } from 'htmlparser2';
import Cookies from 'js-cookie';
import { PATH } from '../../constants/others/paths';
import { ROLES } from '../../constants/settings/workspace';


export const copyToClipboard = (v?: string) => {
  if (!v) return;
  navigator.clipboard?.writeText(v);
  toast({ title: 'Copied to clipboard' });
};

export const copyToClipboardHTML = async (htmlContent?: string) => {
  if (!htmlContent) return;

  try {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([htmlContent], { type: 'text/html' }),
        'text/plain': new Blob([htmlContent.replace(/<[^>]*>?/gm, '')], {
          type: 'text/plain',
        }),
      }),
    ]);

    toast({ title: 'Copied to clipboard' });
  } catch {
    toast({ type: 'failed', title: 'Failed to copy' });
  }
};

export const getVariablesFromString = (subject = '', body = ''): Record<string, string> => {
  const variables: Record<string, string> = {};
  const bodyVariables = body.match(/{{(.*?)}}/g);
  const subjectVariables = subject.match(/{{(.*?)}}/g);

  const processVars = (arr: string[] | null) => {
    if (!arr) return;
    arr.forEach((v) => {
      const [key, defaultValue] = v.replace('{{', '').replace('}}', '').split('|');
      if (key === 'accountSignature') return;
      variables[key] = defaultValue ?? '';
    });
  };

  processVars(bodyVariables);
  processVars(subjectVariables);

  return variables;
};

export const mergeUniqueArray = <T extends Record<string, any>>(existingArray: T[], newArray: T[], key = 'id'): T[] => {
  const uniqueIds = new Set(existingArray.map((item) => item[key]));
  const uniqueObjects = newArray.filter((item) => !uniqueIds.has(item[key]));
  return existingArray.concat(uniqueObjects);
};

export const mapUniqueObjectsInArray = <T extends Record<string, any>>(arr: T[], prop: string): T[] => {
  const uniqueMap = new Map();
  arr.forEach((obj) => uniqueMap.set(obj[prop], obj));
  return [...uniqueMap.values()];
};


export const getSortOrder = (order: number): 'ASC' | 'DESC' => (order === 1 ? 'DESC' : 'ASC');

export const setAndGetSortOrder = (
  sortField: { fieldName: string; order: number },
  setSortField: (field: { fieldName: string; order: number }) => void,
  keyword: string
): 'ASC' | 'DESC' => {
  const newOrder = sortField.fieldName === keyword ? (sortField.order === 0 ? 1 : 0) : 1;
  setSortField({ fieldName: keyword, order: newOrder });
  return getSortOrder(newOrder);
};

export const processPercentage = (num: number): number | string => {
  if (num === 0 || num === 100 || Number.isInteger(num)) return num;
  if (isNaN(num)) return 0;
  return num.toFixed(1);
};

export const addCommas = (value?: number | string): string => {
  if (value === undefined || value === null) return '';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const trimCommaSeparatedValues = (value: string): string[] =>
  value.split(',').map((term) => term.trim()).filter(Boolean);

export const convertCommaSeparatedToArray = (value?: string): string[] =>
  value ? value.split(',').map((item) => item.trim()).filter(Boolean) : [];

export const checkIfValidEmail = (email?: string): boolean => {
  if (!email || email.length > 255) return false;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}(\.[0-9]{1,3}){3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email.toLowerCase());
};

export const getDomainFromEmail = (email?: string): string | undefined =>
  email?.substring(email.lastIndexOf('@') + 1);

export const checkIfDomainIsValid = (domain?: string): boolean =>
  !!domain && /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/.test(domain);

export const checkIfOwner = (user?: { role?: string; workspaceId?: string | null }): boolean =>
  user?.role === ROLES.OWNER && user?.workspaceId === null;

export const checkIfSuperUser = (): boolean => Cookies.get(COOKIES.SUPER_USER) === 'true';


export const validateGoogleSheetsUrl = (url: string): boolean =>
  /https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)\/edit/.test(url);

export const getSpreadsheetIdAndSheetName = (link: string): { spreadsheetId: string | null; sheetName: string | null } => {
  const spreadsheetIdMatch = link.match(/\/spreadsheets\/d\/([^/]+)/);
  const sheetNameMatch = link.match(/gid=([^&]+)/);
  return { spreadsheetId: spreadsheetIdMatch?.[1] || null, sheetName: sheetNameMatch ? decodeURIComponent(sheetNameMatch[1]) : null };
};

export const generateGoogleSheetsUrl = (spreadsheetId: string, sheetName?: string | number, firstCheck = true): string => {
  return firstCheck
    ? `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&id=${spreadsheetId}&gid=${sheetName ?? 0}`
    : `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&id=${spreadsheetId}`;
};

export const base64ToFile = (base64Url: string): File => {
  const [meta, data] = base64Url.split(',');
  const mime = meta.match(/:(.*?);/)?.[1] ?? '';
  const bstr = atob(data);
  const u8arr = new Uint8Array(bstr.length);
  for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
  return new File([u8arr], 'imageFile', { type: mime });
};


export const findDuplicateEmails = (data: Record<string, any>[], emailColumnKey: string): string[] => {
  const emailSet = new Set<string>();
  const duplicates: string[] = [];
  data.forEach((row) => {
    const email = row[emailColumnKey]?.trim();
    if (!email) return;
    if (emailSet.has(email)) duplicates.push(email);
    else emailSet.add(email);
  });
  return duplicates;
};

export const mapUniqueObjectsByProp = <T extends Record<string, any>>(arr: T[], prop: string): T[] => {
  const seen = new Map<string, T>();
  arr.forEach((item) => seen.set(item[prop], item));
  return Array.from(seen.values());
};


export const getRandomElementFromArray = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const getRandomTweetLink = (array: string[]): string => {
  const review = getRandomElementFromArray(array);
  return `https://x.com/intent/tweet?text=${encodeURIComponent(review)}`;
};


export const gtmDataLayerPush = (data: Record<string, any>): void => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }
};


export const getStatusColor = (status?: string, type?: 'bg' | 'text', customAiLabels?: { name: string; interest_status?: string }[]): string => {
  const normalizedStatus = status?.toLowerCase();
  const customLabel = customAiLabels?.find((label) => label.name === status);

  switch (normalizedStatus) {
    case 'lead': return type === 'bg' ? 'bg-white' : '';
    case 'interested': return type === 'bg' ? 'bg-[#84E662]' : '#84E662';
    case 'meeting booked': return type === 'bg' ? 'bg-[#9C62E6]' : '#9C62E6';
    case 'meeting completed': return type === 'bg' ? 'bg-[#E6D162]' : '#E6D162';
    case 'closed': return type === 'bg' ? 'bg-[#626FE6]' : '#626FE6';
    case 'out of office': return type === 'bg' ? 'bg-[#62B6E6]' : '#62B6E6';
    case 'wrong person': return type === 'bg' ? 'bg-[#627FE6]' : '#627FE6';
    case 'not interested': return type === 'bg' ? 'bg-[#E662A1]' : '#E662A1';
    default:
      switch (customLabel?.interest_status) {
        case 'positive': return type === 'bg' ? 'bg-green-600' : '#16a34a';
        case 'negative': return type === 'bg' ? 'bg-red-600' : '#dc2626';
        case 'neutral': return type === 'bg' ? 'bg-yellow-600' : '#ca8a04';
        default: return type === 'bg' ? 'border-gray-700' : '';
      }
  }
};

export const cleanHtmlEmail = (html = ''): string => {
  if (['<p><br></p>', '<br>', '<div><br></div>'].includes(html)) return '';

  let text = html;
  const document = parseDocument(text);

  const cleanElements = (node: Element | DataNode) => {
    if (!('children' in node) || !node.children) return;
    node.children = node.children.flatMap((child) => {
      if (child.type === 'tag' && child.attribs?.id === 'watermark-reachinbox') return [];
      if (child.type === 'tag' && child.name === 'span' && child.attribs?.class?.split(' ').includes('highlighted-spam-word')) return child.children || [];
      if (child.type === 'tag' && child.name === 'br') { if (child.attribs?.style) delete child.attribs.style; return [child]; }
      if (child.type === 'tag' && child.name === 'p') { child.name = 'div'; child.attribs = {}; return [child]; }
      if (child.data) child.data = child.data.replace(/&#xa0;/g, '&nbsp;');
      if (child.type === 'tag' && child.name === 'div') {
        const hasMeaningfulChildren = child.children?.some(c => c.type !== 'text' || (c.data && c.data.trim() !== ''));
        if (!hasMeaningfulChildren) return [{ type: 'tag', name: 'br', children: [] }];
        return [child];
      }
      if (child.type === 'tag' && ['table','td','tr'].includes(child.name)) return [child];
      if (child.data) child.data = child.data.replace(/&apos;/g, "'").replace(/&#x2013;/g, '–').replace(/&#xa0;/g, ' ');
      return [child];
    });
    node.children.forEach(cleanElements);
  };

  cleanElements(document);
  text = DomUtils.getOuterHTML(document);
  text = decode(text);
  text = text.replace(/<span[^>]*class=["']?highlighted-spam-word["']?[^>]*>(.*?)<\/span>/gs, '$1');

  return text;
};


export const checkWorkspaceIdInParams = (url: string): { workspaceId: string | null; initialUrl: string } => {
  try {
    const parsedUrl = new URL(url);
    const urlParams = new URLSearchParams(parsedUrl.search);
    const workspaceId = urlParams.get('workspaceId');
    if (workspaceId) urlParams.delete('workspaceId');
    const initialUrl = `${parsedUrl.origin}${parsedUrl.pathname}${urlParams.toString() ? '?' + urlParams.toString() : ''}`;
    return { workspaceId, initialUrl };
  } catch {
    return { workspaceId: null, initialUrl: url };
  }
};


export const checkForMainTabs = (pathname: string): boolean => {
  const MAIN_PATH = [
    PATH.HOME, PATH.ACCOUNT, PATH.ADD_ACCOUNT, PATH.LEAD_FINDER, PATH.EMAIL_ACCOUNTS,
    PATH.CAMPAIGNS, PATH.CAMPAIGN, PATH.LEAD_LIST, PATH.UNIBOX, PATH.ANALYTICS,
    PATH.SETTINGS, PATH.PROFILE, PATH.COUPON, PATH.BUY_DOMAIN, PATH.WEBSITE_VISITOR, PATH.INBOX_PLACEMENT,
  ];
  return MAIN_PATH.some((p) => pathname.startsWith(p));
};


export const getAddonPurchaseTitleAndDescription = (addons?: string[]) => {
  if (!addons || addons.length > 1) return { title: 'Unlock Premium Features', description: 'Upgrade your account to access these premium features and enhance your workflow.' };
  switch (addons[0]) {
    case 'leads': return { title: 'Expand Your Lead Generation', description: 'Purchase lead credits to grow your prospect database and reach more potential customers.' };
    case 'email': return { title: 'Boost Your Email Outreach', description: 'Add more email credits to scale your campaigns and connect with more prospects.' };
    case 'ai': return { title: 'Power Up with AI Writing', description: 'Get more AI word credits to create compelling messages and content that converts.' };
    case 'workspace': return { title: 'Add Team Workspaces', description: "Expand your team's collaboration capabilities with additional workspace licenses." };
    case 'emailVerifier': return { title: 'Verify Email Addresses', description: 'Improve deliverability and engagement with our email verification service.' };
    default: return { title: 'Unlock Premium Features', description: 'Upgrade your account to access these premium features and enhance your workflow.' };
  }
};

export const getEmailDepletedBannerTitleAndDescription = (userHasUnlimitedEmail?: boolean, userHasUnlimitedLeads?: boolean) => {
  if (!userHasUnlimitedEmail && !userHasUnlimitedLeads) return { title: 'Purchase Additional Email & Lead Credits', description: 'Top up your Email and Active Lead credits to keep your campaigns running smoothly without interruptions.' };
  if (!userHasUnlimitedEmail) return { title: 'Purchase Additional Email Credits', description: 'Add more Email credits to maximize your outreach and send more campaigns with ease.' };
  return { title: 'Unlock Premium Features', description: 'Upgrade your account to access premium features and enhance your workflow.' };
};