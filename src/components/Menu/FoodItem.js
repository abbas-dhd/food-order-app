import { useContext } from "react";
import CartContext from "../../store/cart-ctx";
import classes from "./FoodItem.module.css";

const FoodItem = ({ item }) => {
    const cartContext = useContext(CartContext);
    let itemIndex = cartContext.items.findIndex(
        (menuItem) => menuItem.name === item.name
    );
    let isItemInCart = itemIndex !== -1;

    function addItemHandler() {
        cartContext.addItem(item);
    }
    function removeItemHandler() {
        cartContext.removeItem(item.name);
    }

    return (
        <div className={classes.card}>
            <img
                className={classes.image}
                src={`/assets/${item.image}`}
                height="150px"
                alt={item.image}
            />

            <div className={classes["text-container"]}>
                <p className={classes.title}>{item.name}</p>
                <p>Price: {item.price}</p>
                {isItemInCart && (
                    <>
                        <p>Total: {cartContext.items[itemIndex].qty}</p>
                        <p>Cost(INR): {cartContext.items[itemIndex].amount}</p>
                    </>
                )}
            </div>

            <div className={classes["button-container"]}>
                <button className={classes.add} onClick={addItemHandler}>
                    +
                </button>
                <button
                    className={classes.remove}
                    onClick={removeItemHandler}
                    disabled={!isItemInCart}
                >
                    -
                </button>
            </div>
        </div>
    );
};

export default FoodItem;
