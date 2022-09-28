import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CartProvider from "./store/CartProvider";
import UserProvider from "./store/UserProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <CartProvider>
        <UserProvider>
            <App />
        </UserProvider>
    </CartProvider>
);
