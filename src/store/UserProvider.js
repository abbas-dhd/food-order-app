import { useReducer } from "react";
import UserContext from "./user-ctx";

const defaultState = {
    users: [],
    isLoggedIn: false,
};

const userReducer = (state, action) => {
    if (action.type === "LOGIN") {
        let existingUserIndex = state.users.findIndex(
            (item) => item.email === action.email
        );
        if (existingUserIndex !== -1) {
            let updatedState = {
                users: state.users,
                isLoggedIn: true,
            };

            return updatedState;
        } else {
            return { ...state };
        }
    }
    if (action.type === "SIGNUP") {
        let existingUserIndex = state.users.findIndex(
            (item) => item.email === action.userData.email
        );
        // console.log(existingUserIndex);

        if (existingUserIndex === -1) {
            let newUser = {
                email: action.userData.email,
                password: action.userData.password,
            };

            let updatedUsers = state.users.concat(newUser);

            return { ...state, users: updatedUsers };
        } else {
            let updatedUsers = state.users;
            updatedUsers[existingUserIndex].password = action.userData.password;

            return { ...state, users: updatedUsers };
        }
    }

    return defaultState;
};

const UserProvider = (props) => {
    const [usersState, dispatchUsers] = useReducer(userReducer, defaultState);

    const loginHandler = (email, password) => {
        dispatchUsers({ type: "LOGIN", email, password });
    };

    const signUpHandler = (userData) => {
        dispatchUsers({ type: "SIGNUP", userData });
    };
    const userCTX = {
        isLoggedIn: usersState.isLoggedIn,
        users: usersState.users,
        login: loginHandler,
        signUp: signUpHandler,
    };
    return (
        <UserContext.Provider value={userCTX}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
