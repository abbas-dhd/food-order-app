import { useContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Cart from "./components/Menu/Cart";
import FoodItems from "./components/Menu/FoodItems";
import CartContext from "./store/cart-ctx";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
    const cartContext = useContext(CartContext);
    const [showCart, setShowCart] = useState(false);

    function showCartHandler() {
        setShowCart(true);
    }
    function hideCartHandler() {
        setShowCart(false);
    }
    useEffect(() => {}, [cartContext]);

    return (
        <HashRouter>
            <div className="App">
                <Header onCartClick={showCartHandler} />
                {showCart && <Cart onClose={hideCartHandler} />}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<FoodItems />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </div>
        </HashRouter>
    );
}

export default App;
