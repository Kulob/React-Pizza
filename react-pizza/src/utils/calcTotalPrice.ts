import { CartItems } from "../Components/Redux/Slice/cartSlice"

export const calcTotalPrice = (items: CartItems[]) => {
  return items.reduce((sum, obj) =>obj.price * obj.count + sum, 0);
  };
