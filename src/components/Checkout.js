import classes from "./Checkout.module.css";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../store/user-ctx";
const Checkout = () => {
    const userContext = useContext(UserContext);
    if (!userContext.isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className={classes.card}>
            <h1>Checkout</h1>
            <p>Thank you for your order!</p>
        </div>
    );
};

export default Checkout;
