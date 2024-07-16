import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import Transport from '../api/transport';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (userCredentials) => {
        try {
            const { username, password } = userCredentials;
            const data = { username, password };
            if (username === "" || password === "") {
                throw new Error('Invalid credentials');
            }
            const response = await Transport.HTTP.loginUser(data);
            const responseData = response.data;
            if (responseData.success) {
                const user = responseData.user;
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                Cookies.set('token', responseData.user.token); // Set token in cookies
                return { success: true, msg: "Login Successful" };
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error(error.message);
            return { success: false, msg: error.message };
        }
    };

    const logout = async () => {
        try {
                setUser(null);
                localStorage.removeItem('user');
                Cookies.remove('token'); // Remove token from cookies
           
        } catch (error) {
            console.log("Logout Failed with ", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
