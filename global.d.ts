type TClassName = {
  className?: string;
};

type TChildren = {
  children: React.ReactNode;
};

type LogoProps = {
  className?: string;
  width?: number;
  height?: number;
  color?: string;
  theme?: string;
  fill?: string;
};

type Item = {
  [key: string]: any;
};

type Option = {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
};

type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'tertiary'
  | 'adverse'
  | null
  | undefined;

type BadgeVariant =
  | 'default'
  | 'destructive'
  | 'tertiary'
  | 'secondary'
  | 'outline';

type TSetLoading = (loading: boolean) => void;

type TSetStateFunction<S> = React.Dispatch<React.SetStateAction<S>>;

type AddCommas = {
  (value: number | string | undefined | null): string;
};

type TSetActionLoading = (action: string, isLoading: boolean) => void;

type SortOrderType = 'ASC' | 'DESC' | '';

type Theme = 'light' | 'dark' | 'default';

type ToastStatusType = keyof typeof TOAST_COLORS;

type ToastColor = {
  bg?: string;
  border: string;
  closeButton: string;
};
