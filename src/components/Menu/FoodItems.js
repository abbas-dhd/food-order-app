import { useContext, useEffect, useState } from "react";
import UserContext from "../../store/user-ctx";
import FoodItem from "./FoodItem";
import classes from "./FoodItems.module.css";
import { Navigate } from "react-router-dom";

const FoodItems = () => {
    const [menu, setMenu] = useState([]);
    const userContext = useContext(UserContext);

    useEffect(() => {
        async function fetchFoodItems() {
            const body = await fetch("data/feeds.json", {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                })
                .then((body) => body);

            if (body) {
                setMenu(body);
            }
        }

        fetchFoodItems();
    }, []);

    if (!userContext.isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return (
        <div className={classes["menu-container"]}>
            {menu.map((item) => (
                <FoodItem key={item.name} item={item} />
            ))}
        </div>
    );
};

export default FoodItems;
