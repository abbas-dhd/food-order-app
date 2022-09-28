import { createContext } from "react";

const UserContext = createContext({
    users: [],
    isLoggedIn: false,
    signUp: (userData) => {},
    login: (username, password) => {},
});

export default UserContext;
