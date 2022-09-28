import { useContext, useState } from "react";
import UserContext from "../store/user-ctx";
import classes from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let isInputEmpty =
        emailInput.length === 0 ||
        passwordInput.length === 0 ||
        confirmPassword.length === 0;

    let isValidInput = !isInputEmpty && passwordInput === confirmPassword;

    function signupSubmitHandler(e) {
        e.preventDefault();
        userContext.signUp({ email: emailInput, password: passwordInput });
        navigate("/login");
    }

    return (
        <div className={classes.card}>
            <form>
                <h4>SignUp</h4>
                <div className={classes["input-container"]}>
                    <label htmlFor="e-mail">Email: </label>
                    <input
                        value={emailInput}
                        onChange={(e) => {
                            setEmailInput(e.target.value);
                        }}
                        id="e-mail"
                        type="email"
                        required
                        placeholder="Enter Email Id here"
                    />
                </div>
                <div className={classes["input-container"]}>
                    <label htmlFor="password">Password: </label>
                    <input
                        onChange={(e) => {
                            setPasswordInput(e.target.value);
                        }}
                        value={passwordInput}
                        id="password"
                        type="password"
                        required
                        placeholder="Enter password here"
                    />
                </div>
                <div className={classes["input-container"]}>
                    <label htmlFor="password">Confirm Password: </label>
                    <input
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        value={confirmPassword}
                        id="confirm-password"
                        type="password"
                        required
                        placeholder="Enter password here again"
                    />
                </div>

                <button
                    onClick={signupSubmitHandler}
                    type="submit"
                    className={classes.btn}
                    disabled={!isValidInput}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SignUp;
