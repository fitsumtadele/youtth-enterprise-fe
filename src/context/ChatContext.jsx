import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { socketEndPoint } from '../baseUrl/baseUrl';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [chat, setChat] = useState(true);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(null);
  const setActiveUser = (activeUser) => {
    console.log({activeUser})
    setSelectedUser(activeUser)
  }
  useEffect(() => {
    const newSocket = io(socketEndPoint, {
      withCredentials: true,
      transports: ["websocket"],
    });
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the server');
      newSocket.emit('authenticate', (response) => {
        if (response.success) {
          setUser(response.user);
        } else {
          console.log("Failed Attempt", response);
        }
      });
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from the server');
      setIsConnected(false);
    });

    newSocket.on('private_message', (message) => {
      console.log({selectedUser});
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      socket.emit('broadcastMessage', { message });
    }
  };

  const sendPrivateMessage = (data) => {
    if (socket) {
      socket.emit('private_message', data, (response) => {
        if (response.success) {
          setMessages((prevMessages) => [...prevMessages, response.message]);
        }
        // if (callback) callback(response);
      });
    }
  };

  const authenticate = (username, password, role, callback) => {
    if (socket) {
      socket.emit('authenticate', { username, password, role }, (response) => {
        if (response.success) {
          setUser(response.user);
        }
        if (callback) callback(response);
      });
    }
  };

  return (
    <SocketContext.Provider value={{ socket, messages, setMessages, sendMessage, sendPrivateMessage, authenticate, isConnected, user, chat, setChat, selectedUser, setSelectedUser, setActiveUser }}>
      {children}
    </SocketContext.Provider>
  );
};
