import type { CartItem } from '@/redux/cartSlice';

export const getCartItemsFromStorage = (): CartItem[] | [] => {
  const isInCArt = localStorage.getItem('oilCart');

  if (isInCArt) {
    return JSON.parse(isInCArt);
  } else {
    return [];
  }
};
