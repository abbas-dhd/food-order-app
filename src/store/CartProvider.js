import { useReducer } from "react";
import CartContext from "./cart-ctx";

const defaultState = {
    items: [],
    totalAmount: 0,
};

//items array = [ name: '', price:'', qty:'', amount: '']

const cartReducer = (state, action) => {
    // revieve full item
    if (action.type === "ADD") {
        const updatedTotalAmount =
            state.totalAmount + Number(action.menuItem.price);
        const existingItemIndex = state.items.findIndex(
            (item) => item.name === action.menuItem.name
        );

        let updatedItems;
        if (existingItemIndex > -1) {
            const existingItem = state.items[existingItemIndex];

            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + Number(action.menuItem.price),
                qty: existingItem.qty + 1,
            };
            updatedItems = state.items;
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            const newItem = {
                name: action.menuItem.name,
                price: action.menuItem.price,
                qty: 1,
                amount: Number(action.menuItem.price),
            };

            updatedItems = state.items.concat(newItem);
        }

        return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    if (action.type === "REMOVE") {
        // assumption: this is invoked only of item is already present in the items

        const existingItemIndex = state.items.findIndex(
            (item) => item.name === action.itemName
        );
        const existingItem = state.items[existingItemIndex];

        const updatedTotalAmount =
            state.totalAmount - Number(existingItem.price);
        let updatedItems;
        if (existingItem.qty === 1) {
            updatedItems = state.items.filter(
                (item) => item.name !== action.itemName
            );
        } else {
            const updatedItem = {
                ...existingItem,
                qty: existingItem.qty - 1,
                amount: existingItem.amount - Number(existingItem.price),
            };
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }

        return { totalAmount: updatedTotalAmount, items: updatedItems };
    }
    if (action.type === "CLEAR") {
        return defaultState;
    }

    return defaultState;
};

const CartProvider = (props) => {
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultState);

    const addItemHandler = (menuItem) => {
        dispatchCart({ type: "ADD", menuItem });
    };
    const removeItemHandler = (itemName) => {
        dispatchCart({ type: "REMOVE", itemName });
    };
    const clearCartHandler = () => {
        dispatchCart({ type: "CLEAR" });
    };

    const cartCTX = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler,
    };

    return (
        <CartContext.Provider value={cartCTX}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
