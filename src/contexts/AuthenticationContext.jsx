import { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";

export const AuthenticationContext = createContext();

export function AuthenticationProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) 
            setUser(JSON.parse(storedUser));

        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const loginReq = await api.post('/users/login', { username, password })
        const user = loginReq.data;

        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);

        return user;
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthenticationContext.Provider value={{ user, loading, login, logout }}>
            { children }
        </AuthenticationContext.Provider>
    );
}