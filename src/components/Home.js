import classes from "./Home.module.css";
import { useNavigate, Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../store/user-ctx";
const Home = () => {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    if (!userContext.isLoggedIn) {
        return <Navigate to="/login" />;
    }

    function linkToMenuHandler() {
        navigate("/menu");
    }

    return (
        <div>
            <h1 className={classes.title}>Welcome to Food's Kitchen</h1>
            <button className={classes.btn} onClick={linkToMenuHandler}>
                Go to Menu
            </button>
        </div>
    );
};
export default Home;
