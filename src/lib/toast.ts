type ToastType = 'success' | 'error';
type ToastHandler = (msg: string, type?: ToastType) => void;

let handler: ToastHandler | null = null;

export function registerToastHandler(h: ToastHandler) {
  handler = h;
}

export function toast(msg: string, type: ToastType = 'success') {
  handler?.(msg, type);
}
