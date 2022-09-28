import { useContext } from "react";
import CartContext from "../store/cart-ctx";
import classes from "./Header.module.css";
import { useNavigate } from "react-router-dom";
const Header = (props) => {
    const navigate = useNavigate();
    const cartContext = useContext(CartContext);

    function onHomeClickHandler() {
        navigate("/");
    }

    function onCartClickHandler() {
        props.onCartClick();
    }

    return (
        <header className={classes.header}>
            <div
                className={classes["logo-container"]}
                onClick={onHomeClickHandler}
            >
                <img
                    className={classes.logo}
                    src="assets/restaurant_24px.svg"
                    alt=""
                />
                <h2 className={classes.title}>Food's Restaurant</h2>
            </div>
            {cartContext.items.length > 0 && (
                <div
                    className={classes["cart-container"]}
                    onClick={onCartClickHandler}
                >
                    <img
                        className={classes.cart}
                        src="assets/cart.png"
                        alt="cart"
                        height="35px"
                    />
                    <div className={classes.badge}>
                        {cartContext.items.length}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
