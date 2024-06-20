import React, { createContext, useContext, useState, useEffect } from 'react';
import Transport from '../api/transport';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Retrieve user from local storage if available
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (userCredentials) => {
        // Implement login logic here, e.g., make an API call to authenticate the user
        try {
            const { username, password } = userCredentials;
            const data = { username, password };
            if(username == "" || password == "") {
                throw new Error('Invalid credentials');
            }
            const response = await Transport.HTTP.loginUser(data);
            const responseData = response.data;
            if (response.data.success) {
                const user = response.data.user;
                setUser(user);
                localStorage.setItem('user', JSON.stringify(user));
                return {success:true, msg: "Login Successful"};
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            console.error(error.message);
            return {success:false, msg: error.message};
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            localStorage.removeItem('user');
            const response = await Transport.HTTP.logout();
            if (response.data.success) {
                setUser(null);
                localStorage.removeItem('user');
            } else {
                console.log("Logout Failed");
            }
        } catch (error) {
            console.log("Logout Failed with ",error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
