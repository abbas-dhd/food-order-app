import { createContext } from "react";

const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (menuItem) => {},
    removeItem: (itemName) => {},
    clearCart: () => {},
});

export default CartContext;
