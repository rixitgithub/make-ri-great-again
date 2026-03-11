import * as React from 'react';

// move-constant
const TOAST_LIMIT = 1;
const DEFAULT_TOAST_REMOVE_DELAY = 10000; 

//Move-interface
export interface ToastProps {
  id?: string;
  title?: string;
  description?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  [key: string]: any; // allow extra props
}

interface ToastState {
  toasts: ToastProps[];
}

interface AddToastAction {
  type: 'ADD_TOAST';
  toast: ToastProps;
}

interface UpdateToastAction {
  type: 'UPDATE_TOAST';
  toast: ToastProps;
}

interface DismissToastAction {
  type: 'DISMISS_TOAST';
  toastId?: string;
  delay?: number;
}

interface RemoveToastAction {
  type: 'REMOVE_TOAST';
  toastId?: string;
}

type ToastAction =
  | AddToastAction
  | UpdateToastAction
  | DismissToastAction
  | RemoveToastAction;

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

const toastTimeouts = new Map<string, NodeJS.Timeout>();

let memoryState: ToastState = { toasts: [] };
const listeners: ((state: ToastState) => void)[] = [];

function reducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId, delay } = action;

      if (toastId) addToRemoveQueue(toastId, delay);
      else state.toasts.forEach((t) => addToRemoveQueue(t.id!, delay));

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      };
    }

    case 'REMOVE_TOAST':
      if (!action.toastId) return { ...state, toasts: [] };
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };

    default:
      return state;
  }
}

function dispatch(action: ToastAction) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function addToRemoveQueue(toastId: string, delay = DEFAULT_TOAST_REMOVE_DELAY) {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: 'REMOVE_TOAST', toastId });
  }, delay);

  toastTimeouts.set(toastId, timeout);
}

function toast(props: Omit<ToastProps, 'id' | 'open'> & { autoDismiss?: boolean; delay?: number }) {
  const id = genId();
  const { autoDismiss = true, delay = DEFAULT_TOAST_REMOVE_DELAY, ...rest } = props;

  const update = (updatedProps: Partial<ToastProps>) =>
    dispatch({ type: 'UPDATE_TOAST', toast: { ...updatedProps, id } });

  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id, delay });

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...rest,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open && autoDismiss) dismiss();
      },
    },
  });

  if (autoDismiss) addToRemoveQueue(id, delay);

  return { id, dismiss, update };
}


function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string, delay?: number) => dispatch({ type: 'DISMISS_TOAST', toastId, delay }),
  };
}

export { toast, useToast };