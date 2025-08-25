import React, {createContext, useContext, useState, useEffect} from "react";
import api from "./axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async ()=> {
            try {
                const res = await api.get("/checkAuth");
                if (res.data.loggedIn) {
                    setUser(res.data.user);
                }
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = (u) => {setUser(u)};
    const logout = (u) => {setUser(null)};

    return (
        <AuthContext.Provider value={{user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

