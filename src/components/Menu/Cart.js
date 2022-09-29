import { useContext } from "react";
import CartContext from "../../store/cart-ctx";
import classes from "./Cart.module.css";
import { useNavigate } from "react-router-dom";

const CartItem = ({ item }) => {
    const cartContext = useContext(CartContext);

    function addItemHandler() {
        cartContext.addItem(item);
    }
    function removeItemHandler() {
        cartContext.removeItem(item.name);
    }

    return (
        <div className={classes["cart-item"]}>
            <p>{item.name}:</p> <p>{item.qty}</p>
            <button className={classes.blue} onClick={addItemHandler}>
                +
            </button>
            <button className={classes.red} onClick={removeItemHandler}>
                -
            </button>
        </div>
    );
};

const Cart = ({ onClose }) => {
    const cartContext = useContext(CartContext);
    const navigate = useNavigate();

    function hideCartHandler(e) {
        onClose();
    }
    function linkToCheckoutHandler() {
        cartContext.clearCart();
        onClose();
        navigate("/checkout");
    }

    return (
        <div className={classes.backdrop}>
            <div className={classes.modal}>
                <h4 className={classes.title}>Order Summary</h4>
                {cartContext.items.map((item) => {
                    return <CartItem key={item.name} item={item} />;
                })}

                <p className={classes["total-amt"]}>
                    Total Amount: {cartContext.totalAmount}
                </p>

                <div className={classes["button-container"]}>
                    <button
                        className={classes.blue}
                        onClick={linkToCheckoutHandler}
                    >
                        Save and Checkout
                    </button>
                    <button
                        className={classes.cancel}
                        onClick={hideCartHandler}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
