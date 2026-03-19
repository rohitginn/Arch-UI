import { ref, readonly } from 'vue';

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'glass';

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastType;
  duration?: number;
  closable?: boolean;
}

const toasts = ref<ToastData[]>([]);
let toastIdCounter = 0;

export function useGlassToast(options = { maxToasts: 5, defaultDuration: 5000 }) {
  const addToast = (props: Omit<ToastData, 'id'> | string, type: ToastType = 'default') => {
    const id = `toast-${++toastIdCounter}`;
    const toastProps = typeof props === 'string'
      ? { description: props, variant: type, duration: options.defaultDuration }
      : { duration: options.defaultDuration, ...props, variant: props.variant || type };

    toasts.value.push({ id, ...toastProps });
    if (toasts.value.length > options.maxToasts) {
      toasts.value.shift();
    }
    return id;
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };

  const clearAll = () => {
    toasts.value = [];
  };

  const toast = {
    show: (props: Omit<ToastData, 'id'> | string) => addToast(props),
    success: (props: Omit<ToastData, 'id'> | string) => addToast(props, 'success'),
    error: (props: Omit<ToastData, 'id'> | string) => addToast(props, 'error'),
    warning: (props: Omit<ToastData, 'id'> | string) => addToast(props, 'warning'),
    info: (props: Omit<ToastData, 'id'> | string) => addToast(props, 'info'),
    dismiss: removeToast,
    dismissAll: clearAll,
  };

  return {
    toasts: readonly(toasts),
    toast,
    removeToast
  };
}
