export const TOAST_COLORS = {
  success: {
    light: { bg: '#ECFDF3' },
    dark: { bg: '#091817' },
    default: { bg: '#E0E0E0' },
    common: { border: '#47CD89', closeButton: '#47CD89' },
  },
  failed: {
    light: { bg: '#FEF3F2' },
    dark: { bg: '#180909' },
    default: { bg: '#F0E0E0' },
    common: { border: '#D92D20', closeButton: '#D92D20' },
  },
  loading: {
    light: { bg: '#090e18' },
    dark: { bg: '#090e18' },
    default: { bg: '#0B0F1A' },
    common: { border: '#037adc', closeButton: '#037adc' },
  },
  warning: {
    light: { bg: '#FFFAEB' },
    dark: { bg: '#181409' },
    default: { bg: '#FAE8C8' },
    common: { border: '#DC6803', closeButton: '#DC6803' },
  },
} as const;

export const defaultToastMessages: Record<
  ToastStatusType,
  { title: string; description: string }
> = {
  success: {
    title: 'All Systems Go! ',
    description: 'The action was successful.',
  },
  failed: {
    title: "⚠️ Uh-oh, Something's Off",
    description: 'An error occurred. Please try again.',
  },
  loading: {
    title: '⏳ Hang Tight!',
    description: 'Processing your request. Please wait.',
  },
  warning: {
    title: '⚠️ Heads Up!',
    description: 'There may be an issue that needs attention.',
  },
};
