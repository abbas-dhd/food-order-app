import { useContext, useState } from "react";
import UserContext from "../store/user-ctx";
import classes from "./Login.module.css";

import { Navigate, useNavigate } from "react-router-dom";

let isFirstCheck = true;

const Login = () => {
    const userContext = useContext(UserContext);
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const navigate = useNavigate();

    if (userContext.isLoggedIn === true) {
        return <Navigate to="/" />;
    }

    let isValidData;
    if (isFirstCheck) {
        isValidData = true;
    } else {
        isValidData = userContext.isLoggedIn;
    }

    function loginHandler(e) {
        e.preventDefault();
        isFirstCheck = false;
        userContext.login(emailInput, passwordInput);
    }

    function createAccountHandler() {
        navigate("/signup");
    }
    return (
        <div className={classes.card}>
            <form>
                <h4>Login</h4>
                <div className={classes["input-container"]}>
                    <label htmlFor="e-mail">Email: </label>
                    <input
                        id="e-mail"
                        type="email"
                        required
                        placeholder="Enter Email Id here"
                        value={emailInput}
                        onChange={(e) => {
                            setEmailInput(e.target.value);
                        }}
                    />
                </div>
                <div className={classes["input-container"]}>
                    <label htmlFor="password">Password: </label>
                    <input
                        value={passwordInput}
                        id="password"
                        type="password"
                        required
                        placeholder="Enter password here"
                        onChange={(e) => {
                            setPasswordInput(e.target.value);
                        }}
                    />
                </div>

                <button
                    type="submit"
                    className={classes.btn}
                    onClick={loginHandler}
                    disabled={
                        !(emailInput.length > 0 && passwordInput.length > 0)
                    }
                >
                    Login
                </button>

                {!isValidData && (
                    <p className={classes.error}>Invalid email or password</p>
                )}
            </form>

            <button
                className={classes["create-account-btn"]}
                onClick={createAccountHandler}
            >
                Create New Accout
            </button>
        </div>
    );
};

export default Login;
